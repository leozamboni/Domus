import React, { Suspense, useEffect, useState } from "react";
import { Box, ChakraProvider, Text } from "@chakra-ui/react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./screens/home";
import { RotatingLines } from "react-loader-spinner";
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
      <Box w="100vw" h="100vh" textAlign="center">
        <Text
          fontSize="50pt"
          fontWeight="900"
          letterSpacing="-5px"
          transform="scale(1,0.6)"
        >
          Domus
        </Text>
        <Box display="flex" justifyContent="center" alignItems="center">
          <RotatingLines
            strokeColor="black"
            visible={true}
            width="30"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
          />
        </Box>
      </Box>
    );
  }

  return (
    <ChakraProvider>
      {isMobile ? (
        <Box w="100vw" h="100vh" textAlign="center">
          <Text
            fontSize="50pt"
            fontWeight="900"
            letterSpacing="-5px"
            transform="scale(1,0.6)"
          >
            Domus
          </Text>
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
