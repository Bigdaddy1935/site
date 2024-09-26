"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import Image from "@/components/Assets/Image";
import Paper from "@/components/Assets/Paper";
import VideoPlayer from "@/components/Assets/VideoPlayer";
import IconLock from "@/components/Icons/IconLock";
import useHandleLogin from "@/hooks/useHandleLogin";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import { useProgressMutation } from "@/lib/services/auth";
import { useEffect, useMemo, useState } from "react";
import { LessenItem } from "@/types/";
import useNextRouter from "@/hooks/useNextRouter";

const needAuthLessons = ["course", "product", "club"];
type Props = {
  src: string;
  poster: string | null;
  lessonId: number;
  progress: LessenItem["progress"];
  type?: string;
  paid?: boolean;
};
export default function LessonVideo({
  src,
  poster,
  lessonId,
  progress,
  type = "course",
  paid = true,
}: Props) {
  const user = useAppSelector(selectUser);
  const router = useNextRouter();
  const [timeData, setTimeData] = useState({ currentTime: 0, duration: 0 });
  const { handleLogin } = useHandleLogin();
  const [update] = useProgressMutation();

  const [error, setError] = useState({
    message: `جهت مشاهده درس در سایت ثبت نام کنید یا وارد حساب کاربری خود شوید`,
    mode: "auth",
    buttonMessage: "ورود | ثبت نام",
  });
  function handleSendRequest() {
    timeData.duration > 0 &&
      timeData.currentTime &&
      update({
        lessonId: Number(lessonId),
        ...timeData,
      });
  }
  function handleWindowClose(this: any, ev: Event) {
    handleSendRequest();

    ev.returnValue = true; // Gecko, Trident, Chrome 34+
    return true;
  }
  useEffect(() => {
    if (user && needAuthLessons.includes(type)) {
      window.addEventListener("beforeunload", handleWindowClose);
    }

    return () => window.removeEventListener("beforeunload", handleWindowClose);
  }, [timeData, user]);

  const canSeeVideo = useMemo(() => {
    if (needAuthLessons.includes(type) && !user) return false;

    if (type === "product" && !paid) {
      setError({
        message: "شما این دوره را خریداری نکرده اید.",
        mode: "product",
        buttonMessage: "خریداری این دوره",
      });
      return false;
    }

    if (type === "club" && !user?.mahdyar_exists) {
      setError({
        message: "جهت مشاهده این درس ثبت نام در مهدیارشو الزامی است.",
        mode: "club",
        buttonMessage: "ثبت نام در مهدیارشو",
      });
      return false;
    }

    return true;
  }, [user]);

  const handleClick = () => {
    if (error.mode === "auth") handleLogin();

    if (error.mode === "product") router.push(`/product/product-${21}`);
    if (error.mode === "club") router.push(`/club-register`);
  };
  return (
    <>
      {user || !needAuthLessons.includes(type) ? (
        <VideoPlayer
          type={type}
          onPause={
            user && needAuthLessons.includes(type)
              ? handleSendRequest
              : undefined
          }
          progress={progress?.[0]}
          setTimeData={setTimeData}
          src={src}
          poster={poster}
        />
      ) : (
        <div className="relative rounded-3xl overflow-hidden h-[300px] lg:h-[85vh] p-2">
          {poster ? (
            <Image fill className="object-[unset]" src={poster} alt="" />
          ) : null}
          <div className="flex items-center  justify-center bg-black/90 absolute right-0 left-0 top-0 bottom-0 p-5">
            <Paper className="flex flex-col items-center justify-center lg:p-14">
              <IconLock
                width={68}
                height={68}
                className="text-hgray-400 dark:text-text-dark-3 max-w-sm"
              />
              <p className="font-medium text-hgray-400 dark:text-text-dark-3 my-6">{error.message}</p>

              <EmptyButton
                className="text-primary-700 dark:text-text-dark-2 font-semibold"
                onClick={handleClick}
              >
                {error.buttonMessage}
              </EmptyButton>
            </Paper>
          </div>
        </div>
      )}
    </>
  );
}
