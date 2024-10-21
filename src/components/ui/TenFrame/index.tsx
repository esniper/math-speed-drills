import Cell from "@/components/ui/cell";

interface TenFrameProps {
  filledCells: number; // Number of filled cells (between 0-10)
}

export function TenFrame({ filledCells: number }: TenFrameProps) {
  // Create an array of 10 cells, some filled and some not
  const cells = Array(10)
    .fill(false)
    .map((_, index) => index < number);

  return (
    <div className="grid grid-cols-5 gap-0 border border-black w-fit">
      {cells.map((filled, index) => (
        <Cell key={index} filled={filled} />
      ))}
    </div>
  );
}

export default TenFrame;
