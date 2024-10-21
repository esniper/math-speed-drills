import Link from "next/link";

interface EndScreenProps {
  correctCount: number;
  wrongCount: number;
  onRestart: () => void;
}

export default function EndScreen({
  correctCount,
  wrongCount,
  onRestart,
}: EndScreenProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <div className="text-3xl font-bold">Game Over!</div>
      <div className="text-xl">
        Correct: <span className="text-green-600">{correctCount}</span>
      </div>
      <div className="text-xl">
        Wrong: <span className="text-red-600">{wrongCount}</span>
      </div>
      <button
        className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        onClick={onRestart}
      >
        Restart Game
      </button>
      <Link href="/settings" className="mt-2 text-blue-500 hover:underline">
        Settings
      </Link>
    </div>
  );
}
