"use client";
import ActiveLink from "@/components/Assets/ActiveLink";
import EmptyButton from "@/components/Assets/EmptyButton";
import Image from "@/components/Assets/Image";
import Divider from "@/components/Divider";
import IconBookmark from "@/components/Icons/IconBookmark";
import IconCart3 from "@/components/Icons/IconCart3";
import IconClassTeacher from "@/components/Icons/IconClassTeacher";
import IconCommentDiscussionTwentyFour from "@/components/Icons/IconCommentDiscussionTwentyFour";
import IconCopy from "@/components/Icons/IconCopy";
import IconEdit from "@/components/Icons/IconEdit";
import IconHome from "@/components/Icons/IconHome";
import IconLogout from "@/components/Icons/IconLogout";
import IconMessageSquare from "@/components/Icons/IconMessageSquare";
import IconWallet from "@/components/Icons/IconWallet";
import useCopyToClipBoard from "@/hooks/useCopyToClipboard";
import useLogout from "@/hooks/useLogout";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";
import Skeleton from "react-loading-skeleton";

const menuItems = [
  {
    title: "داشبورد",
    href: "",
    Icon: IconHome,
  },
  {
    title: "ویرایش پروفایل",
    href: "/edit",
    Icon: IconEdit,
  },
  {
    title: "کلاس های من",
    href: "/my-class",
    Icon: IconClassTeacher,
  },
  {
    title: "خریداری شده",
    href: "/orders",
    Icon: IconCart3,
  },
  {
    title: "نشان شده",
    href: "/bookmarks",
    Icon: IconBookmark,
  },
  {
    title: "کیف پول شما",
    href: "/wallet",
    Icon: IconWallet,
  },
  {
    title: "ارسال تیکت",
    href: "/tickets",
    Icon: IconMessageSquare,
  },
];

const managerItems = [
  {
    title: "مدیریت تیکت ها",
    href: "/manage-tickets",
    Icon: IconMessageSquare,
  },
  {
    title: "مدیریت نظرات",
    href: "/manage-comments",
    Icon: IconCommentDiscussionTwentyFour,
  },
];
export default function ProfileSidebar() {
  const user = useAppSelector(selectUser);
  const { copyToClipboard } = useCopyToClipBoard();
  const { handleLogout } = useLogout();
  return (
    <div className="scroll-hidden shadow-sp bottom-0 right-0 top-[60px] w-full overflow-y-auto bg-white p-4  dark:bg-mdark-600 lg:sticky self-start lg:h-[98vh] lg:w-[275px] lg:pt-14 lg:shadow-2xl">
      {!user ? (
        <LoadingLayout />
      ) : (
        <div className="flex flex-col items-stretch">
          <Image
            src={user.picture ?? "/default-profile-lg.png"}
            width={144}
            height={144}
            className="mx-auto h-[144px] w-[144px] overflow-hidden rounded-full bg-hgray-300 object-cover object-top"
            alt=""
          />

          <div className="mt-3 px-1.5">
            {[...menuItems, ...(user.approved === 1 ? managerItems : [])].map(
              (item) => (
                <ActiveLink
                  key={item.href}
                  href={`/profile${item.href}`}
                  activeClassName="!text-white bg-primary-300 [&>span>svg]:text-white"
                  className="my-1.5 flex w-full items-center justify-between overflow-hidden rounded-lg bg-hgray-200 text-hgray-600  dark:bg-mdark-400 dark:text-hgray-200 [&>span]:py-3"
                >
                  <span className="flex flex-1 items-center justify-between rounded-lg px-2">
                    <span className="text-sm">{item.title}</span>

                    <item.Icon
                      width={22}
                      height={22}
                      className="text-primary-300 dark:text-hgray-200"
                    />
                  </span>
                </ActiveLink>
              )
            )}

            <div className="flex items-center gap-3">
              <p className="inline-block text-hgray-600 dark:text-hgray-200">
                کد معرف شما
              </p>
              <div className="flex items-center">
                <span className="inline-block w-full rounded-xl bg-hgray-100 px-3 py-1 text-center text-hgray-600 dark:bg-mdark-400 dark:text-hgray-200  lg:bg-hgray-200">
                  {user.code}
                </span>

                <EmptyButton
                  onClick={() => copyToClipboard(user.code)}
                  className="mr-3"
                >
                  <IconCopy
                    width={22}
                    height={22}
                    className="text-primary-400"
                  />
                </EmptyButton>
              </div>
            </div>
          </div>

          <Divider className="mt-4" />

          <div className="p-3  pb-20 lg:pb-3">
            <EmptyButton
              className="my-1.5 flex w-full items-center justify-between overflow-hidden rounded-lg bg-hgray-200 text-hgray-600  dark:bg-mdark-400 dark:text-hgray-200 [&>span]:py-3"
              onClick={() => handleLogout()}
            >
              <span className="flex flex-1 items-center justify-between rounded-lg px-2">
                <span className="text-sm">خروج</span>

                <IconLogout
                  width={22}
                  height={22}
                  className="text-primary-300 dark:text-hgray-200"
                />
              </span>
            </EmptyButton>
          </div>
        </div>
      )}
    </div>
  );
}

const LoadingLayout = () => {
  return (
    <div className="flex flex-col items-stretch">
      <Skeleton
        circle
        width="144px"
        height="144px"
        containerClassName="mx-auto"
      />

      <div className="mt-3 px-3">
        {menuItems.map((item) => (
          <Skeleton
            width="100%"
            height="34px"
            key={item.href}
            className="my-1 rounded-lg"
          />
        ))}

        <Skeleton width="100%" height="34px" className="my-1 rounded-lg" />
      </div>

      <Divider className="mt-4" />

      <div className="p-3">
        <Skeleton width="100%" height="34px" className="my-1 rounded-lg" />
      </div>
    </div>
  );
};
