import { useEffect } from "react";
import { useLeaderboardStore } from "../store/leaderboardStore";
import {
  Alert,
  AlertIcon,
  Center,
  Heading,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ScoreEntry } from "../../../shared/store/types";

/**
 * Leaderboard Component
 *
 * Displays a table of high scores from the typing test.
 * Features:
 * - Automatically fetches leaderboard data on mount
 * - Shows loading state while fetching
 * - Displays errors if fetch fails
 * - Presents scores in a reverse chronological order
 * - Empty state handling
 */
export const Leaderboard: React.FC = () => {
  const leaderboard = useLeaderboardStore.use.leaderboard();
  const isLoading = useLeaderboardStore.use.isLoading();
  const error = useLeaderboardStore.use.error();
  const fetchLeaderboard = useLeaderboardStore.use.fetchLeaderboard();

  /**
   * Effect to fetch leaderboard data when component mounts
   * Dependency on fetchLeaderboard ensures we re-fetch if the function changes
   */
  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  /**
   * Loading state render
   * Shows a centered spinner while data is being fetched
   */
  if (isLoading)
    return (
      <Center w="full" py="10">
        <Spinner size="xl" data-testid="loading-spinner" />
      </Center>
    );

  /**
   * Error state render
   * Displays an alert with the error message if fetch fails
   */
  if (error)
    return (
      <Center w="full" py="10">
        <Alert status="warning">
          <AlertIcon />
          <Heading fontSize="lg">Error: {error}</Heading>
        </Alert>
      </Center>
    );

  const reversedLeaderboard = [...leaderboard].reverse();

  return (
    <>
      {Boolean(leaderboard?.length) === false && <div>Empty Results</div>}
      <TableContainer>
        <Table variant="striped" colorScheme="blue">
          <TableCaption>List of best scores</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>WPM</Th>
              <Th>Accuracy</Th>
              <Th>Score</Th>
            </Tr>
          </Thead>
          <Tbody>
            {reversedLeaderboard.map((score: ScoreEntry) => (
              <Tr
                key={score.id}
                data-testid={`score-${score.id}-${score.words}`}
              >
                <Td>{score.username}</Td>
                <Td>{score.wpm}</Td>
                <Td>{score.accuracy}</Td>
                <Td>{score.score}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};
