interface StartScreenProps {
  onStart: (withTenFrame: boolean, bothFrames: boolean) => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <button
        className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        onClick={() => onStart(false, false)}
      >
        Start
      </button>
      <button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        onClick={() => onStart(true, false)}
      >
        Start with Ten Frame
      </button>
      <button
        className="px-6 py-3 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600"
        onClick={() => onStart(true, true)}
      >
        Ten Frame for Both Numbers
      </button>
    </div>
  );
}