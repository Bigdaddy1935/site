"use client";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useQuiz } from "./QuizProvider";

export default function QuizDuration({ duration }: { duration: number }) {
  const [currentDuration, setCurrentDuration] = useState(duration);
  const { setStatus } = useQuiz();
  useEffect(() => {
    const timeout = setTimeout(
      () => currentDuration > 0 && setCurrentDuration((prev) => prev - 1),
      1000
    );

    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    if (currentDuration === 0) setStatus("end");
  }, [currentDuration]);
  return (
    <div>
      <CircularProgressbar
        className="w-[100px] h-[100px]"
        styles={{
          path: { stroke: "#9f3ed7" },
          text: { fill: "#9f3ed7", fontWeight: "600", fontSize: "2rem" },
        }}
        strokeWidth={6}
        value={(currentDuration / duration) * 100}
        text={`${currentDuration}`}
      />
    </div>
  );
}
