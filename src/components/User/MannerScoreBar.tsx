interface MannerScoreBarProps {
  score: number;
  maxScore?: number;
}

export default function MannerScoreBar({
  score,
  maxScore = 4.5,
}: MannerScoreBarProps) {
  const percentage = (score / maxScore) * 100;
  return (
    <div className="w-20 mx-auto flex items-center">
      <div className="bg-gray-300 rounded-full h-3 w-full">
        <div
          className="bg-emerald-500 h-3 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
