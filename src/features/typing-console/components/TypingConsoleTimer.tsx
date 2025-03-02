export const TypingConsoleTimer: React.FC<{seconds: number, minutes: number}> = ({seconds, minutes}) => {
  return (
    <div style={{ fontSize: "100px" }}>
      <span>{minutes}</span>:<span>{seconds}</span>
    </div>
  );
};
