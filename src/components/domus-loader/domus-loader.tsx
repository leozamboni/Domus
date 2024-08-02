import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StPeterStourtonModel } from "../domus-models/st-peter-stourton-model";
import { DomusRuntime } from "../domus-runtime";
import { Box } from "@chakra-ui/react";
import { DomusRuntimeContext } from "../../App";
import { DomusModels } from "../../Models";

export function Loader() {
  const [searchParams] = useSearchParams();
  const model = searchParams.get("model");
  const navigate = useNavigate();
  const { setDomusModelSettings } = useContext(DomusRuntimeContext);


  function getModelSettings() {
    return DomusModels[model];
  }

  setDomusModelSettings(getModelSettings())

  navigate("/runtime");

  return <></>;
}
