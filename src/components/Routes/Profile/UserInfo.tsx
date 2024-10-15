"use client";
import Paper from "@/components/Assets/Paper";
import Skeleton from "@/components/Assets/Skeleton";
import Divider from "@/components/Divider";
import { formatPhoneNumber } from "@/lib/number";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";

export default function UserInfo() {
  const user = useAppSelector(selectUser);
  return (
    <Paper className="px-5">
      {!user ? (
        <LoadingLayout />
      ) : (
        <>
          <div className="flex justify-between py-2">
            <p className="text-hgray-600 dark:text-white font-medium text-lg">
              {user.username}
            </p>

            <p className="ltr text-hgray-600 dark:text-white font-medium text-lg">
              {formatPhoneNumber(user.phone)}
            </p>
          </div>

          <Divider />

          <div className="flex py-2 justify-between items-center">
            <p className="text-hgray-600 dark:text-white w-[25%] text-center text-sm">
              {user.fullname.split(",")[0]}
            </p>

            <Divider className="h-8" orientation="vertical" />
            <p className="text-hgray-600 dark:text-white w-[50%] text-center text-sm">
              {user.fullname.split(",")[1]}
            </p>

            <Divider className="h-8" orientation="vertical" />

            <p className="text-hgray-600 dark:text-white w-[25%] text-center text-sm px-2">
              {user.birthday || "تاریخ تولد ثبت نشده است"}
            </p>
          </div>

          <Divider />

          <div className="flex justify-between py-2 items-center">
            <p className="text-hgray-600 dark:text-white w-[60%] text-center">
              {user.address || "آدرس ثبت نشده است"}
            </p>

            <Divider className="h-8" orientation="vertical" />

            <p className="text-hgray-600 dark:text-white w-[40%] text-center px-1">
              {user.national_code || "کد ملی ثبت نشده است"}
            </p>
          </div>
        </>
      )}
    </Paper>
  );
}

function LoadingLayout() {
  return (
    <>
      <div className="flex justify-between py-2">
        <Skeleton width="120px" height="24px" className="rounded-lg" />
        <Skeleton width="120px" height="24px" className="rounded-lg" />
      </div>

      <Divider />

      <div className="flex py-2 justify-between items-center">
        <Skeleton width="120px" height="18px" className="rounded-lg" />

        <Divider className="h-8" orientation="vertical" />
        <Skeleton width="120px" height="18px" className="rounded-lg" />

        <Divider className="h-8" orientation="vertical" />

        <Skeleton width="120px" height="18px" className="rounded-lg" />
      </div>

      <Divider />

      <div className="flex justify-between py-2 items-center">
        <Skeleton
          width="190px"
          height="18px"
          className="rounded-lg mx-auto max-w-[100%]"
        />

        <Divider className="h-8" orientation="vertical" />

        <Skeleton width="130px" height="18px" className="rounded-lg" />
      </div>
    </>
  );
}
