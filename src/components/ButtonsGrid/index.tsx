interface ButtonsGridProps {
  onClick: (number: number) => void;
}

export default function ButtonsGrid({ onClick }: ButtonsGridProps) {
  return (
    <div className="w-full h-full grid grid-cols-5 grid-rows-4">
      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          className="w-full h-full flex items-center justify-center 
                     bg-gray-200 text-xl font-semibold border border-gray-300 hover:bg-gray-300 transition"
          onClick={() => onClick(num)}
        >
          {num}
        </button>
      ))}
    </div>
  );
}
