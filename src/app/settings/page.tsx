"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [gameTime, setGameTime] = useState(120); // Default 2 minutes

  // Load the game time from local storage on page load
  useEffect(() => {
    const storedTime = localStorage.getItem("gameTime");
    if (storedTime) setGameTime(Number(storedTime));
  }, []);

  const handleSave = () => {
    localStorage.setItem("gameTime", gameTime.toString());
    router.push("/"); // Go back to the game start page
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Settings</h1>
      <label className="text-lg">
        Game Time (seconds):
        <input
          type="number"
          value={gameTime}
          onChange={(e) => setGameTime(Number(e.target.value))}
          className="ml-2 px-2 py-1 border rounded"
          min={30}
        />
      </label>
      <button
        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600"
        onClick={handleSave}
      >
        Save & Back to Game
      </button>
    </div>
  );
}
