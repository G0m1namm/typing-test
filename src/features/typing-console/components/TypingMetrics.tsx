import { HStack, Text, VStack } from "@chakra-ui/react";

interface TypingMetricsProps {
  accuracy: number;
  wordsPerMinute: number;
  wordCount: number;
}

/**
 * TypingMetrics Component
 * 
 * Displays real-time metrics for the typing test including:
 * - Words per minute (WPM)
 * - Accuracy percentage
 * - Total words typed
 */
export const TypingMetrics: React.FC<TypingMetricsProps> = ({
  accuracy,
  wordsPerMinute,
  wordCount,
}) => {
  return (
    <HStack spacing={8} p={4} bg="gray.50" rounded="md" width="full" justifyContent="center">
      <VStack>
        <Text fontSize="2xl" fontWeight="bold" color="blue.500">
          {wordsPerMinute}
        </Text>
        <Text fontSize="sm" color="gray.600">
          WPM
        </Text>
      </VStack>
      <VStack>
        <Text fontSize="2xl" fontWeight="bold" color="green.500">
          {accuracy.toFixed(2)}%
        </Text>
        <Text fontSize="sm" color="gray.600">
          Accuracy
        </Text>
      </VStack>
      <VStack>
        <Text fontSize="2xl" fontWeight="bold" color="purple.500">
          {wordCount}
        </Text>
        <Text fontSize="sm" color="gray.600">
          Words
        </Text>
      </VStack>
    </HStack>
  );
};
