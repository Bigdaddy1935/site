"use client";
import Button from "@/components/Assets/Button";
import EmptyButton from "@/components/Assets/EmptyButton";
import Image from "@/components/Assets/Image";
import Skeleton from "@/components/Assets/Skeleton";
import useHandleLogin from "@/hooks/useHandleLogin";
import { useMobilePopup } from "@/lib/MobilePopupContext";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useGetCourseQuizQuery } from "@/lib/services/mahdyar";
import React, { useMemo, useState } from "react";
import QuizProvider, { useQuiz } from "./QuizProvider";
import QuizTesting from "./QuizTesting";
import QuizEnd from "./QuizEnd";
import { selectHeader } from "@/lib/reduxFeatures/headerSlice";
import Confirm from "./Confirm";

export default function QuizList({ course_id }: { course_id: number }) {
  const user = useAppSelector(selectUser);

  const checkAccess = useMemo(() => {
    if (!user) return <NeedAuthError />;

    if (!user?.mahdyar_exists && !user?.authority) return <AccessError />;

    return null;
  }, [user]);
  return (
    <div className="min-h-[80vh]">
      <QuizProvider>
        {checkAccess || <QuizStart course_id={course_id} />}
      </QuizProvider>
    </div>
  );
}

function NeedAuthError() {
  const user = useAppSelector(selectUser);
  const { handleLogin } = useHandleLogin();
  const { setContent } = useMobilePopup();

  const handleClick = () => {
    setContent({ content: null });
    handleLogin();
  };
  return (
    <div className="flex flex-col items-center">
      <Image width={300} height={300} src={"/no-auth.png"} alt="" />
      <p className="text-hgray-400 dark:text-text-dark-3 font-medium text-lg mb-8">
        برای شرکت در آزمون لطفا وارد سایت شوید.
      </p>

      <EmptyButton
        className="text-base text-blue-600 font-medium"
        onClick={handleClick}
      >
        ورود | ثبت نام
      </EmptyButton>
    </div>
  );
}

function AccessError() {
  const user = useAppSelector(selectUser);
  const { setContent } = useMobilePopup();
  return (
    <div className="flex  flex-col items-center">
      <Image width={300} height={300} src={"/access.png"} alt="" />
      <p className="text-hgray-400 dark:text-text-dark-3 font-medium text-lg mb-8">
        برای شرکت در آزمون لطفا در باشگاه مهدیارشو ثبت نام کنید
      </p>

      <EmptyButton
        className="text-base text-blue-600 font-medium"
        onClick={() => setContent({ content: null })}
      >
        بستن
      </EmptyButton>
    </div>
  );
}

function QuizStart({ course_id }: { course_id: number }) {
  const { status, setStatus } = useQuiz();
  const { courseShowQuiz } = useAppSelector(selectHeader);
  const { data, isLoading } = useGetCourseQuizQuery(
    { course_id },
    { skip: !courseShowQuiz }
  );
  const { setContent } = useMobilePopup();
  return (
    <div>
      {isLoading ? <Skeleton width={200} height={200} /> : null}

      {data && data?.length > 0 ? (
        <div className="flex flex-col-reverse lg:flex-row  items-stretch justify-between">
          {status === "start" ? (
            <div className="flex w-full lg:w-[unset] flex-1 gap-5 flex-col items-stretch max-w-sm mx-auto justify-center">
              <p className="text-2xl font-semibold text-hgray-500 dark:text-text-dark-3 mt-6">
                {data[0].name}
              </p>
              <div className="flex justify-between">
                <p className="dark:text-text-dark-4">زمان آزمون:</p>
                <p className="dark:text-text-dark-4">
                  {Math.floor(data[0].duration / 60)} دقیقه
                </p>
              </div>
              <div className="flex justify-between">
                <p className="dark:text-text-dark-4">تعداد سوال:</p>
                <p className="dark:text-text-dark-4">
                  {data[0].questions.length} سوال
                </p>
              </div>
              <div className="flex justify-between">
                <Button onClick={() => setStatus("confirm")} className="flex-1">
                  شروع آزمون
                </Button>
                <EmptyButton
                  className="text-base flex-1 text-blue-600 font-medium"
                  onClick={() => setContent({ content: null })}
                >
                  انصراف
                </EmptyButton>
              </div>
            </div>
          ) : null}

          {status === "confirm" ? <Confirm /> : null}
          {status === "testing" || status === "review" ? (
            <QuizTesting {...data[0]} />
          ) : null}
          {status === "end" ? <QuizEnd quiz_id={data[0].id} /> : null}

          <div
            className={`flex-1 lg:max-w-[50%] items-center justify-center hidden lg:flex`}
          >
            <Image
              width={400}
              height={400}
              src={"/quiz.svg"}
              alt=""
              className="object-cover max-w-[250px] lg:max-w-[unset]"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Image width={300} height={300} src={"/no-result.svg"} alt="" />
          <p className="text-hgray-400 dark:text-text-dark-3 font-medium text-lg mb-8">
            برای این سرفصل آزمون فعالی یافت نشد.
          </p>

          <EmptyButton
            className="text-base text-blue-600 font-medium"
            onClick={() => setContent({ content: null })}
          >
            بستن
          </EmptyButton>
        </div>
      )}
    </div>
  );
}
