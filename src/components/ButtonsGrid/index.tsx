interface ButtonsGridProps {
  onClick: (number: number) => void;
}

export default function ButtonsGrid({ onClick }: ButtonsGridProps) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          className="px-4 py-2 rounded-lg shadow-md bg-blue-500 text-white font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => onClick(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
