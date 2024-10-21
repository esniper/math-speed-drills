interface ScoreboardProps {
  correctCount: number;
  wrongCount: number;
}

export default function Scoreboard({
  correctCount,
  wrongCount,
}: ScoreboardProps) {
  return (
    <div className="flex items-center space-x-8 text-xl mb-10">
      <div className="flex items-center gap-2">
        <span className="text-green-600 font-bold">Correct:</span>
        <span>{correctCount}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-red-600 font-bold">Wrong:</span>
        <span>{wrongCount}</span>
      </div>
    </div>
  );
}
