import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { IconAlertTriangleFilled, IconCode } from "@tabler/icons-react";
import React, { useContext, useState } from "react";
import { DomusRuntime } from "../components/domus-runtime";
import { StPeterStourtonModel } from "../components/domus-models/st-peter-stourton-model";
import { useNavigate } from "react-router-dom";
import { DomusRuntimeContext } from "../App";
import { DomusRuntimeSized } from "../components/domus-runtime/domus-runtime-sized";

export function Home() {
  const [modalOpen, setModalOpen] = useState(true);
  const navigate = useNavigate();
  const { setDomusModelSettings } = useContext(DomusRuntimeContext);

  function handleEnterBtn() {
    setDomusModelSettings({
      model: StPeterStourtonModel,
      title: "St Peter's Church. Stourton, England",
    });
    navigate("/runtime");
  }

  return (
    <>
      <Grid h="100vh" templateColumns="repeat(2, 1fr)" gap={1}>
        <GridItem textAlign="center" w="100%">
          <Box position="absolute" ml="10px" mt="10px" color="green.700">
            <Link
              href="https://github.com/leozamboni/Domus"
              target="_blank"
              title="Code"
            >
              <IconCode />
            </Link>
          </Box>

          <Box h="230px">
            <Center>
              <Flex fontSize="5vw" mt="30px" color="green.700" translate="yes">
                <Text fontFamily="rosecaps">D</Text>
                <Text>omus</Text>
              </Flex>
            </Center>
            <Text color="yellow.600" fontSize="xl">
              Christo Nihil Præponere
            </Text>
          </Box>

          <Center>
            <SimpleGrid
              columns={2}
              spacing={5}
              w="60%"
              h="calc(100vh - 340px)"
              overflowY="scroll"
              bg="#d8d8d8"
            >
              <Box>
                <Card
                  textAlign="center"
                  border="2px solid"
                  borderColor="green.700"
                  _hover={{ cursor: "pointer" }}
                >
                  <CardBody>
                    <Image
                      src="st-peters-church-stourto.jpg"
                      alt="St Peters Church, Stourto."
                      borderRadius="lg"
                    />
                    <Heading size="sm">St Peter's Church</Heading>
                    <Text>
                      High St, Stourton, Warminster BA12 6QE, United Kingdom.
                    </Text>
                  </CardBody>
                </Card>
              </Box>
            </SimpleGrid>
          </Center>
          <Center>
            <Box position="absolute" bottom="50px">
              <Button
                onClick={handleEnterBtn}
                bg="red.700"
                color="white"
                _hover={{ backgroundColor: "red.800" }}
              >
                Enter
              </Button>
            </Box>
          </Center>
        </GridItem>
        <GridItem w="100%" position="relative">
          <DomusRuntimeSized />
        </GridItem>
      </Grid>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <IconAlertTriangleFilled
              style={{ float: "left", marginRight: "10px" }}
            />
            Warning
          </ModalHeader>
          <ModalBody>
            <Text>
              Domus require processing power for renderings. You might only get
              a few frames per second with old hardware.
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={() => setModalOpen(false)}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
