import React, { useEffect, useRef, useState } from "react";
import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";
import { Euler, Vector3 } from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";

interface PlayerProps {
  rotation: Euler;
  position: Vector3;
  speed: number;
}

export function Player({ position, speed, rotation }: PlayerProps) {
  const direction = new Vector3();
  const frontVector = new Vector3();
  const sideVector = new Vector3();
  const ref = useRef() as any;
  const rapier = useRapier();
  const [, get] = useKeyboardControls();
  const { camera } = useThree();

  const initialCamRot = rotation ? rotation : new Euler(0, 9.8, 0);
  const { x, y, z } = initialCamRot;
  camera.rotation.set(x, y, z);

  const roundPosCheck = (currVal, initVal) =>
    Math.round(currVal) === Math.round(initVal);

  useFrame(() => {
    const { forward, backward, left, right, jump, reset } = get();
    const { y: velocity } = ref.current.linvel();

    // update camera
    let p = ref.current.translation();
    camera.position.set(p.x, p.y, p.z);

    // reset position
    if (
      reset &&
      (!roundPosCheck(p.x, position.x) || !roundPosCheck(p.z, position.z))
    ) {
      camera.rotation.set(x, y, z);
      ref.current.setTranslation(position);
      return;
    }

    // movement
    frontVector.set(0, 0, Number(backward) - Number(forward));
    sideVector.set(Number(left) - Number(right), 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(speed)
      .applyEuler(camera.rotation);
    ref.current.setLinvel({ x: direction.x, y: velocity, z: direction.z });

    // jumping
    const world = rapier.world.raw();
    const ray = world.castRay(
      new RAPIER.Ray(ref.current.translation(), { x: 0, y: -1, z: 0 }),
      1,
      false
    );
    const grounded = ray && ray.collider && Math.abs(ray.toi) < 1;
    if (jump && grounded) ref.current.setLinvel({ x: 0, y: 7.5, z: 0 });
  });

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      mass={1}
      type="dynamic"
      position={position}
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[0.7, 0.3]} />
    </RigidBody>
  );
}
