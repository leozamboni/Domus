import React, { Suspense, useEffect, useState } from "react";
import {
  Box,
  Center,
  ChakraProvider,
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./screens/home";
import { TailSpin } from "react-loader-spinner";
import { Loader } from "./components/domus-loader";
import { StPeterStourtonModel } from "./components/domus-models";
import { DomusRuntime } from "./components/domus-runtime";

export interface DomusModelSettings {
  model: any;
  title: string;
}

export const DomusRuntimeContext = React.createContext({
  domusModelSettings: null,
  setDomusModelSettings: (s: DomusModelSettings) => {},
});

function App() {
  const [domusModelSettings, setDomusModelSettings] = React.useState({
    model: StPeterStourtonModel,
    title: "St Peter's Church. Stourton, England",
  });

  const [width, setWidth] = useState<number>(window.innerWidth);

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const isMobile = width <= 768;

  function loading() {
    return (
      <Center w="100vw" h="100vh">
        <SimpleGrid columns={2} spacing={5}>
          <Box>
            <Flex fontSize="5vw">
              <Text fontFamily="rosecaps">D</Text>
              <Text>omus</Text>
            </Flex>
          </Box>

          <Box>
            <Center h="100%" mr="80%">
              <TailSpin
                visible={true}
                height="50"
                width="50"
                color="black"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </Center>
          </Box>
        </SimpleGrid>
      </Center>
    );
  }

  return (
    <ChakraProvider>
      {isMobile ? (
        <Box w="100vw" h="100vh" textAlign="center">
          <Center>
            <Flex fontSize="5vw" mt="30px" color="green.700">
              <Text fontFamily="rosecaps">D</Text>
              <Text>omus</Text>
            </Flex>
          </Center>
          Sorry Domus require a computer
        </Box>
      ) : (
        <DomusRuntimeContext.Provider
          value={{
            domusModelSettings,
            setDomusModelSettings,
          }}
        >
          <React.StrictMode>
            <HashRouter>
              <Suspense fallback={loading()}>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="load" element={<Loader />} />
                    <Route path="runtime" element={<DomusRuntime />} />
                  </Route>
                </Routes>
              </Suspense>
            </HashRouter>
          </React.StrictMode>
        </DomusRuntimeContext.Provider>
      )}
    </ChakraProvider>
  );
}

export default App;
