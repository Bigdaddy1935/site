"use client";
import Image from "@/components/Assets/Image";
import { dispayUserName } from "@/lib/number";
import { toPersianDateFormat } from "@/lib/toPersianDateFormat";
import React from "react";
import { CommentItem as CommentItemType } from "@/types";
import AdminReply from "./AdminComments/AdminReply";
import BoxComment from "./BoxComment";
import CommentTempReplies from "./CommentTempReplies";
import ContentBox from "./ContentBox";
import ReplyForm from "./ReplyForm";
import { useAppSelector } from "@/lib/reduxHooks";
import { selectUser } from "@/lib/reduxFeatures/authSlice";

type Props = {
  level?: number;
} & CommentItemType;

export default function CommentItem({ level = 1, ...props }: Props) {
  const { user, body, updated_at, replies, id, timeAgo } = props;
  const currentUser = useAppSelector(selectUser);
  return (
    <React.Fragment>
      <BoxComment level={level}>
        <div className="relative flex items-start justify-between">
          <div className="flex flex-col items-center text-center">
            <Image
              className="h-[48px] rounded-full object-cover object-top"
              src={user?.picture ?? "/default-profile.png"}
              width={48}
              height={48}
              alt="48"
            />
            <p className="mt-1 min-w-[60px] rounded-xl bg-white p-1 px-1 text-sm  text-hgray-600 dark:bg-mdark-500 dark:text-white lg:font-medium">
              {user?.approved === 1 ? "کارشناس" : "کاربر"}
            </p>

            <span className="mt-1 text-xs lg:text-sm font-light text-hgray-400 dark:text-hgray-300">
              {timeAgo}
            </span>
            <span className="mt-0.5 text-sm font-light text-hgray-400 dark:text-hgray-300">
              {toPersianDateFormat(updated_at)}
            </span>
          </div>

          <div className="flex-1 ps-3">
            <p className="mb-4 font-semibold text-hgray-600 dark:text-white">
              {currentUser?.approved === 1
                ? user.username
                : dispayUserName(user?.username)}
            </p>
            {currentUser?.approved === 1 ? (
              <p className="text-sm text-hgray-500 dark:text-text-dark-4 -mt-4">{`شناسه کاربر: ${user.id}`}</p>
            ) : null}
            <ContentBox level={level}>
              <p className="text-[14px] font-light text-hgray-400 dark:text-hgray-300 lg:text-base">
                {body}
              </p>
            </ContentBox>
          </div>
          {level > 0 && (
            <>
              <AdminReply {...props} />
            </>
          )}
        </div>

        {level > 0 ? (
          <div className={replies?.length > 0 ? "mt-8" : ""}>
            <CommentTempReplies commentId={id} />
            {replies?.map((item) => (
              <div className="mt-3" key={item.id}>
                <CommentItem level={level - 1} {...item} />
              </div>
            ))}
          </div>
        ) : null}
      </BoxComment>

      {level > 0 && <ReplyForm id={props.id} />}
    </React.Fragment>
  );
}
