"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import React from "react";
import { useQuiz } from "./QuizProvider";

export default function Confirm() {
  const { setStatus } = useQuiz();
  return (
    <div className="flex flex-1 flex-col items-center min-h-56 justify-center">
      <p className="text-hgray-600 dark:text-text-dark-2 font-medium">
        درصورت به پایان نرساندن آزمون هیچ امتیازی برای ثبت نخواهد شد
      </p>

      <EmptyButton
        className="mt-11 border border-solid p-2 w-full max-w-[400px] rounded-lg  border-primary-300 text-primary-300 dark:border-primary-50 dark:text-primary-50"
        onClick={() => setStatus("testing")}
      >
        فهمیدم
      </EmptyButton>
    </div>
  );
}
