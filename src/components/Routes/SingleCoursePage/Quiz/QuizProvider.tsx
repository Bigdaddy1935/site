"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import IconWindowClose from "@/components/Icons/IconWindowClose";
import { useMobilePopup } from "@/lib/MobilePopupContext";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export type QuizStatus = "start" | "confirm" | "testing" | "end" | "review";

export type Score = {
  correct: number;
  wrong: number;
  quizComplete: number;
  questionCount: number;
  totalScore: number;
};
type QuizState = {
  status: QuizStatus;
  setStatus: (status: QuizStatus) => void;
  score: Score;
  setScore: (score: Score) => void;
  answersGiven: number[];
  setAnswersGiven: (answersGiven: number[]) => void;
  submit: boolean;
  setSubmit: (submit: boolean) => void;
};
const QuizConext = createContext<QuizState>({
  status: "start",
  setStatus: () => {},
  score: {
    correct: 0,
    wrong: 0,
    quizComplete: 0,
    questionCount: 0,
    totalScore: 0,
  },
  setScore: () => {},
  answersGiven: [],
  setAnswersGiven: () => {},
  submit: false,
  setSubmit: () => {},
});

export const useQuiz = () => useContext(QuizConext);

export default function QuizProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<QuizStatus>("start");
  const [answersGiven, setAnswersGiven] = useState<number[]>([]);
  const [submit, setSubmit] = useState(false);
  const { setContent } = useMobilePopup();
  const [score, setScore] = useState<Score>({
    correct: 0,
    wrong: 0,
    quizComplete: 0,
    questionCount: 0,
    totalScore: 0,
  });
  /*   useEffect(() => {
    const closeWindowEvent = (e: MouseEvent) => {
      if (status === "start") return;

      console.log({ e: e.clientY });
      setContent({
        content: (
          <div className="p-5">
            <div className="flex justify-center items-center mb-3">
              (
              <IconWindowClose
                width={68}
                height={68}
                className="text-rose-900/30"
              />
              )
            </div>
            <p className="text-center text-hgray-500  dark:text-text-dark-2">
              با عدم تکمیل آزمون نمره صفر برای شما لحاظ خواهد شد.
            </p>

            <div className="mt-6 flex justify-center gap-10">
              <EmptyButton
                onClick={() => {}}
                className="text-primary-300 dark:text-text-dark-5"
              >
                تایید
              </EmptyButton>
              <EmptyButton
                onClick={() => setContent({ content: null })}
                className="text-rose-500 dark:text-text-dark-5"
              >
                انصراف
              </EmptyButton>
            </div>
          </div>
        ),
        origin: "up",
      });
      e.preventDefault();
      console.log("close window...");
      e.returnValue = false;
      return false;
    };

    window?.addEventListener("mouseleave", closeWindowEvent);

    return () => window?.removeEventListener("mouseleave", closeWindowEvent);
  }, [status]); */
  return (
    <QuizConext.Provider
      value={{
        status,
        setStatus,
        score,
        setScore,
        answersGiven,
        setAnswersGiven,
        submit,
        setSubmit,
      }}
    >
      {children}
    </QuizConext.Provider>
  );
}
