interface CellProps {
  filled?: boolean;
}

function Cell({ filled = false }: CellProps) {
  return (
    <div className="flex items-center justify-center h-10 w-10 border border-black">
      {filled && <div className="rounded-full h-7 w-7 bg-green-500"></div>}
    </div>
  );
}

export default Cell;
