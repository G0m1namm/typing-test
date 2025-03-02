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
import { useTypingStore } from "./features/typing-console/store/typingTestStore";
import { useTextStore } from "./features/typing-console/store/textStore";
import { useMemo } from "react";

const App: React.FC = () => {
  const status = useTypingStore.use.status();
  const accuracy = useTypingStore.use.accuracy();
  const wordsPerMinute = useTypingStore.use.wpm();
  const currentWordIndex = useTextStore.use.currentWordIndex();
  const correctWordsCount = currentWordIndex;

  const subHeadingText = useMemo(
    () =>
      status === "FINISHED"
        ? `You typed ${correctWordsCount} words at ${wordsPerMinute} WPM. Accuracy: ${accuracy.toFixed(
            2
          )}%`
        : "Test Your Typing Speed, Scrub!",
    [correctWordsCount, wordsPerMinute, accuracy]
  );

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
          <Center display="grid">
            <Heading as="h1" mb="3">
              Typing Speed Test
            </Heading>
            <Heading as="h3" fontSize="2xl" color="gray">
              {subHeadingText}
            </Heading>
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
