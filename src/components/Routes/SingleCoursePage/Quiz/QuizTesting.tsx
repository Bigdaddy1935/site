"use client";
import { Quiz } from "@/types";
import React, { useEffect, useMemo, useState } from "react";
import QuizDuration from "./QuizDuration";
import EmptyButton from "@/components/Assets/EmptyButton";
import Button from "@/components/Assets/Button";
import { useQuiz } from "./QuizProvider";

export default function QuizTesting(props: Quiz) {
  const { duration, questions } = props;
  const [currentQustion, setCurrentQuestion] = useState<number>(0);
  const { score, setScore, setStatus, answersGiven, setAnswersGiven } =
    useQuiz();
  const handleClick = (selected: number) => {
    setAnswersGiven(
      answersGiven.length > currentQustion
        ? answersGiven.map((item, index) =>
            index === currentQustion ? selected : item
          )
        : [...answersGiven, selected]
    );

    if (currentQustion < questions.length - 1)
      setTimeout(() => setCurrentQuestion((prev) => prev + 1), 50);
  };

  useEffect(() => {
    setScore({ ...score, questionCount: questions.length });
  }, [questions]);

  const handleNextQuestion = () => {
    if (
      !answersGiven[currentQustion] ||
      currentQustion === questions.length - 1
    )
      return;
    setCurrentQuestion((prev) => prev + 1);
  };
  const handlePrevQuestion = () => {
    if (currentQustion === 0) return;
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleEndTest = () => {
    setScore({
      correct: answersGiven.filter(
        (i, index) => questions[index].correct_answer === i
      ).length,
      wrong: answersGiven.filter(
        (i, index) => questions[index].correct_answer !== i
      ).length,
      quizComplete: (answersGiven.length / questions.length) * 100,
      questionCount: questions.length,
      totalScore: answersGiven
        .map((i, index) =>
          questions[index].correct_answer === i ? questions[index].score : 0
        )
        .reduce((c, i) => c + i, 0),
    });
    return setStatus("end");
  };
  return (
    <div autoFocus={true} className="flex border border-solid border-hgray-350 rounded-xl p-4 w-full lg:w-[unset] lg:max-w-sm mx-auto flex-1 flex-col items-stretch">
      <div className="bg-hgray-200 dark:bg-mdark-400 w-full p-4 rounded-lg">
        <QuizDuration duration={duration} />

       {/*  <div className="flex justify-between">
          <p className="text-base text-rose-600">
            {
              answersGiven.filter(
                (i, index) => questions[index].correct_answer !== i
              ).length
            }{" "}
            غلط
          </p>
          <p className="text-green-900 dark:text-green-300">
            {
              answersGiven.filter(
                (i, index) => questions[index].correct_answer === i
              ).length
            }{" "}
            صحیح
          </p>
        </div> */}

        <p className="text-center text-blue-500 mt-4">{`سوال ${currentQustion + 1} / ${questions.length}`}</p>
        <p className="text-center font-medium mt-5 text-hgray-600 dark:text-text-dark-4">
          {questions[currentQustion].question}
        </p>
      </div>

      {questions.map((question, index) =>
        currentQustion === index ? (
          <div key={question.id} className="overflow-hidden">
            <AnswerOption
              onClick={() => handleClick(1)}
              text={question.answer1}
              answersGiven={answersGiven[currentQustion]}
              isCorrectAnswer={question.correct_answer === 1}
              optionNumber={1}
            />
            <AnswerOption
              onClick={() => handleClick(2)}
              text={question.answer2}
              answersGiven={answersGiven[currentQustion]}
              isCorrectAnswer={question.correct_answer === 2}
              optionNumber={2}
            />
            <AnswerOption
              onClick={() => handleClick(3)}
              text={question.answer3}
              answersGiven={answersGiven[currentQustion]}
              isCorrectAnswer={question.correct_answer === 3}
              optionNumber={3}
            />
            <AnswerOption
              onClick={() => handleClick(4)}
              text={question.answer4}
              answersGiven={answersGiven[currentQustion]}
              isCorrectAnswer={question.correct_answer === 4}
              optionNumber={4}
            />
          </div>
        ) : null
      )}

      <div className="flex justify-between mt-6">
        <EmptyButton
          className="  dark:border-mdark-500 dark:text-text-dark-2"
          color="gray"
          disabled={!answersGiven[currentQustion]}
          onClick={
            currentQustion === questions.length - 1
              ? handleEndTest
              : handleNextQuestion
          }
        >
          {currentQustion === questions.length - 1
            ? "پایان آزمون"
            : "سوال بعدی"}
        </EmptyButton>

        <EmptyButton
          className="  dark:border-mdark-500 dark:text-text-dark-2"
          color="gray"
          disabled={currentQustion === 0}
          onClick={handlePrevQuestion}
        >
          {"سوال قبلی"}
        </EmptyButton>
      </div>
    </div>
  );
}

type AnswerProps = {
  text: string;
  onClick: () => void;
  answersGiven: number | undefined;
  isCorrectAnswer: boolean;
  optionNumber: number;
};

function AnswerOption(props: AnswerProps) {
  const { text, onClick, answersGiven, isCorrectAnswer, optionNumber } = props;
  const { status } = useQuiz();
  const [selected, setSelected] = useState<boolean>(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    setSelected(answersGiven === optionNumber);
  }, [answersGiven, optionNumber]);
  const handleClick = () => {
    setSelected(true);
    onClick();
  };

  const getOptionColor = useMemo(() => {
    if (status === "testing" && selected)
      return "border-hgray-600 dark:border-mdark-500";

    if (status === "review") {
      if (isCorrectAnswer) return "border-green-800";

      if (selected && !isCorrectAnswer) return "border-rose-500";
    }

    return "border-hgray-350 dark:border-mdark-400";
  }, [selected, answersGiven, isCorrectAnswer, status]);

  useEffect(() => {
    const hiddenTimeout = setTimeout(() => setHidden(false), 10);

    return () => clearTimeout(hiddenTimeout);
  }, []);
  return (
    <EmptyButton
      onClick={handleClick}
      className={`flex ${hidden ? "translate-x-[100%]" : "translate-x-0"} transition-transform justify-between items-center w-full hover:border-solid  border-2 border-solid border-mdark-400 rounded-lg my-4 p-2 ${getOptionColor}`}
    >
      <p className="flex-1 text-hgray-600 dark:text-text-dark-5 text-sm text-right font-medium">
        {text}
      </p>
      <span
        className={`w-4 h-4 rounded-full inline-block border-2 border-solid ${getOptionColor}`}
      ></span>
    </EmptyButton>
  );
}
