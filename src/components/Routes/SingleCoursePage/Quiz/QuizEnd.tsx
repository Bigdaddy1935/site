"use client";
import React, { useEffect } from "react";
import { useQuiz } from "./QuizProvider";
import IconLoading from "@/components/Icons/IconLoading";
import Button from "@/components/Assets/Button";
import { useMobilePopup } from "@/lib/MobilePopupContext";
import { useUserQuizScoreMutation } from "@/lib/services/mahdyar";

export default function QuizEnd({ quiz_id }: { quiz_id: number }) {
  const {
    score: { totalScore, quizComplete, questionCount, correct, wrong },
    submit,
    setSubmit,
    setStatus,
  } = useQuiz();

  const [fetchِData, { isLoading, isError, data }] = useUserQuizScoreMutation();

  useEffect(() => {
    if (!submit)
      fetchِData({
        quiz_id,
        score: totalScore,
      }).finally(() => setSubmit(true));
  }, [submit]);

  const { setContent } = useMobilePopup();
  return (
    <div className="flex border border-solid border-hgray-350 rounded-xl p-4 mx-auto flex-1 flex-col items-stretch">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="w-[300px] flex flex-col justify-between items-center">
          <p className="text-2xl flex items-center justify-center text-primary-300 font-medium bg-hgray-300 rounded-full p-4 w-[100px] h-[100px]">
            {totalScore}
          </p>
          <p className="mt-4 text-primary-400 dark:text-text-dark-5">
            امتیاز شما
          </p>
        </div>

        <div className="flex gap-6 lg:flex-col flex-wrap justify-between">
          <div className="w-[50%] lg:w-[unset]">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-400 dark:bg-primary-50"></span>
            <p className="text-primary-400 inline-block pr-4 dark:text-primary-50">
              {quizComplete}%
            </p>
            <p className="text-sm text-hgray-400 dark:text-text-dark-5">
              درصد تکمیل آزمون
            </p>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-primary-400 dark:bg-primary-50"></span>
            <p className="text-primary-400 inline-block pr-4 dark:text-primary-50">
              {questionCount}
            </p>
            <p className="text-sm text-hgray-400 dark:text-text-dark-5">
              تعداد کل سوالات
            </p>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-green-800"></span>
            <p className="text-green-800 inline-block pr-4">{correct}</p>
            <p className="text-sm text-hgray-400 dark:text-text-dark-5">
              پاسخ صحیح
            </p>
          </div>
          <div>
            <span className="inline-block w-2 h-2 rounded-full bg-rose-500"></span>
            <p className="text-rose-500 inline-block pr-4">{wrong}</p>
            <p className="text-sm text-hgray-400 dark:text-text-dark-5">
              پاسخ غلط
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center flex-1 gap-7">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <IconLoading width={48} height={48} className="text-hgray-400" />
              <p className="mt-4 text-hgray-400">در حال ثبت امتیاز</p>
            </div>
          ) : null}
          {data ? (
            <p className="text-center text-green-800 font-medium">
              امتیاز شما با موفقیت ثبت شد.
            </p>
          ) : null}

          {isError ? (
            <p className="text-center text-rose-500 font-medium">
              امتیاز شما قبلا ثبت شده است.
            </p>
          ) : null}

          <p className="text-sm font-medium text-center text-hgray-400 dark:text-text-dark-2 max-w-sm">
            در نظر داشته باشید امتیاز شما فقط برای بار اول ثبت می شود، و در صورت
            تکرار آزمون، امتیاز اول شما محاسبه می گردد.
          </p>

          <div>
            <Button
              color="gray"
              size="small"
              className="px-2 dark:text-text-dark-3"
              outlined
              disabled={isLoading}
              onClick={() =>
                !isLoading ? setContent({ content: null }) : null
              }
            >
              بستن آزمون
            </Button>

            <Button
              color="gray"
              size="small"
              className="px-2 dark:text-text-dark-3"
              outlined
              disabled={isLoading}
              onClick={() => (!isLoading ? setStatus("review") : null)}
            >
              مرور سوالات
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
