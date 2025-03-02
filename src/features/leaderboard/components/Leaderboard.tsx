import { useEffect } from "react";
import { useLeaderboardStore } from "../store/leaderboardStore"

export const Leaderboard: React.FC = () => {
    const leaderboard = useLeaderboardStore.use.leaderboard();
    const isLoading = useLeaderboardStore.use.isLoading();
    const error = useLeaderboardStore.use.error();
    const fetchLeaderboard = useLeaderboardStore.use.fetchLeaderboard();
    
    useEffect(() => {
      fetchLeaderboard()
    }, [fetchLeaderboard])
    
    if(isLoading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>

    return (
      <>
        {Boolean(leaderboard?.length) === false && <div>Empty Results</div>}
        <ul>
          {leaderboard.map((score) => (
            <li key={score.id}>
              <strong>ID: {score.id} - </strong>
              {score.username}
              <strong> - {score.score}</strong>
            </li>
          ))}
        </ul>
      </>
    );
}