import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { DomusRuntimeCore } from "./domus-runtime-core";

export function DomusRuntimeSized() {
  return (
    <Box w="100%" h="100%">
      <DomusRuntimeCore />
    </Box>
  );
}
