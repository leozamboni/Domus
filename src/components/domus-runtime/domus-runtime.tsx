import React, { useContext } from "react";
import { Box } from "@chakra-ui/react";
import { DomusRuntimeCore } from "./domus-runtime-core";

export function DomusRuntime() {
  return (
    <Box w="100vw" h="100vh">
      <DomusRuntimeCore />
    </Box>
  );
}
