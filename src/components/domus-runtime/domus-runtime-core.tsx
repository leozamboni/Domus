import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { KeyboardControls, PointerLockControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { MeshCollider, Physics, RigidBody } from "@react-three/rapier";
import { Player } from "../player";
import { DomusRuntimeHUD } from "./domus-runtime-hud";
import { Euler, Vector3 } from "three";
import { DomusRuntimeContext } from "../../App";

export function DomusRuntimeCore() {
  const { domusModelSettings } = useContext(DomusRuntimeContext);
  const { model: Model } = domusModelSettings;

  return (
    <>
      <DomusRuntimeHUD />
      <KeyboardControls
        map={[
          { name: "forward", keys: ["ArrowUp", "KeyW"] },
          { name: "backward", keys: ["ArrowDown", "KeyS"] },
          { name: "left", keys: ["ArrowLeft", "KeyA"] },
          { name: "right", keys: ["ArrowRight", "KeyD"] },
          { name: "jump", keys: ["Space"] },
          { name: "esc", keys: ["Esc"] },
          { name: "reset", keys: ["KeyR"] },
        ]}
      >
        <Canvas>
          <Physics gravity={[0, -20, 0]}>
            <Player
              speed={3}
              position={new Vector3(2.1, 3, 5)}
              rotation={new Euler(0.2, 0)}
            />
            <RigidBody type="fixed" colliders="hull">
              <MeshCollider type={"trimesh"}>
                <Model />
              </MeshCollider>
            </RigidBody>
          </Physics>

          <PointerLockControls selector="#button" />
          <ambientLight intensity={2} />
          <pointLight intensity={0.8} position={[5, 0, 5]} />
        </Canvas>
      </KeyboardControls>
    </>
  );
}
