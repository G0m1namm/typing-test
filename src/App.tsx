import type React from "react";
import { Leaderboard } from "./features/leaderboard/components/Leaderboard";
import { TestPanel } from "./features/typing-console/components/TestPanel";
import {
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import "./App.css";

const App: React.FC = () => {
  return (
    <Container
      maxW="container.xl"
      className="App"
      justifyContent="center"
      alignItems="flex-start"
    >
      <Flex
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
        w="80%"
        h="full"
        minH="70vh"
        marginInline="auto"
        my="20"
      >
        <Box mb="10">
          <Center>
            <Heading>Typing Speed Test</Heading>
          </Center>
        </Box>
        <Tabs isFitted w="full">
          <TabList mb="1em">
            <Tab>Typing Zone</Tab>
            <Tab>Leaderboard</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TestPanel />
            </TabPanel>
            <TabPanel>
              <Leaderboard />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Container>
  );
};

export default App;
