"use client";
import Button from "@/components/Assets/Button";
import usePopup from "@/hooks/usePopup";
import { useMobilePopup } from "@/lib/MobilePopupContext";
import React from "react";
import QuizList from "./QuizList";
import { CourseItem } from "@/types";

export default function QuizStartButton(props : CourseItem) {
    const {course_title , id} = props;
  const { setContent } = useMobilePopup();

  const handleClick = () => {
    setContent({
      content: <QuizList course_id={id} />,
      closeBtn: true,
      origin: "bottom",
      modalHeader : `آزمون فصل ${course_title}`,
      disableCloseOnClick : true
    });
  };
  return (
    <div className="my-3">
      <Button
        onClick={handleClick}
        outlined
        color="gray"
        size="medium"
        fullWidth
        className="dark:border-mdark-400 dark:text-text-dark-2"
      >
        ورود به آزمون این فصل
      </Button>
    </div>
  );
}
