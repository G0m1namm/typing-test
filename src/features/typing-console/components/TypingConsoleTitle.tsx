import { useTypingStore } from "../store/typingTestStore";
import { Heading } from "@chakra-ui/react";

export const TypingConsoleTitle: React.FC = () => {
  const status = useTypingStore.use.status();

  return (
    <Heading as="h4" fontSize="lg">
      {status === "FINISHED"
        ? "Refresh to retake the test!"
        : "Type the following:"}
    </Heading>
  );
};
