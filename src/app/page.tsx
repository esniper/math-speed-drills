"use client";
import { useState, useEffect, useRef } from "react";
import StartScreen from "@/components/StartScreen";
import Scoreboard from "@/components/Scoreboard";
import ButtonsGrid from "@/components/ButtonsGrid";
import TenFrame from "@/components/ui/TenFrame";
import EndScreen from "@/components/EndScreen";

function getRandomNumber() {
  return Math.floor(Math.random() * 9) + 1;
}

export default function TenFramePage() {
  const [leftNumber, setLeftNumber] = useState<number | null>(null);
  const [rightNumber, setRightNumber] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [mode, setMode] = useState<"start" | "single" | "double" | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameTime, setGameTime] = useState(120);

  const correctSound = useRef<HTMLAudioElement | null>(null);
  const wrongSound = useRef<HTMLAudioElement | null>(null);
  const gameEndSound = useRef<HTMLAudioElement | null>(null);

  const correctAnswer = (leftNumber ?? 0) + (rightNumber ?? 0);

  useEffect(() => {
    const storedTime = localStorage.getItem("gameTime");
    if (storedTime) setGameTime(Number(storedTime));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((prev) => prev + 1), 1000);
    if (seconds >= gameTime) {
      setGameOver(true);
      clearInterval(timer);
      playSound(gameEndSound.current);
    }
    return () => clearInterval(timer);
  }, [seconds, gameTime]);

  const nextProblem = () => {
    let num1 = getRandomNumber();
    let num2 = getRandomNumber();
    if (num2 > num1) [num1, num2] = [num2, num1];
    setLeftNumber(num1);
    setRightNumber(num2);
  };

  const handleStart = (selectedMode: "start" | "single" | "double") => {
    setMode(selectedMode);
    setGameOver(false);
    setSeconds(0);
    nextProblem();
  };

  const handleRestart = () => {
    setCorrectCount(0);
    setWrongCount(0);
    setSeconds(0);
    setGameOver(false);
    setMode(null); // Go back to the start screen
  };

  const handleButtonClick = (number: number) => {
    if (number === correctAnswer) {
      setCorrectCount((prev) => prev + 1);
      playSound(correctSound.current);
      nextProblem();
    } else {
      setWrongCount((prev) => prev + 1);
      playSound(wrongSound.current);
    }
  };

  const playSound = (audioElement: HTMLAudioElement | null) => {
    if (audioElement) {
      const playPromise = audioElement.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Audio playback failed:", error);
        });
      }
    }
  };

  // Dynamically set the height to handle mobile browser UI changes
  useEffect(() => {
    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  if (gameOver) {
    return (
      <EndScreen
        correctCount={correctCount}
        wrongCount={wrongCount}
        onRestart={handleRestart}
      />
    );
  }

  if (mode === null) {
    return <StartScreen onStart={handleStart} />;
  }

  return (
    <div
      className="flex flex-col bg-gray-100 p-4 md:p-8 overflow-hidden"
      style={{ height: "calc(var(--vh) * 100)" }}
    >
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-4">
        <div className="text-lg md:text-xl font-semibold">Time: {seconds}s</div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={handleRestart}
        >
          Restart
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <div className="flex items-center justify-center p-4 overflow-hidden">
          {mode !== "start" ? (
            <TenFrame filledCells={leftNumber!} />
          ) : (
            <div className="text-4xl md:text-5xl">{leftNumber}</div>
          )}
        </div>

        <div className="flex items-center justify-center">
          <div className="text-5xl md:text-6xl font-bold">+</div>
        </div>

        <div className="flex items-center justify-center p-4 overflow-hidden">
          {mode === "double" ? (
            <TenFrame filledCells={rightNumber!} />
          ) : (
            <div className="text-4xl md:text-5xl">{rightNumber}</div>
          )}
        </div>
      </div>

      {/* Buttons Grid and Scoreboard */}
      <div className="flex-1 flex flex-col items-center justify-between py-4 md:py-8">
        <Scoreboard correctCount={correctCount} wrongCount={wrongCount} />
        <div className="w-full h-full">
          <ButtonsGrid onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
}
