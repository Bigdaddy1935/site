"use client";
import IconBagHandleOutline from "@/components/Icons/IconBagHandleOutline";
import IconBxBookReader from "@/components/Icons/IconBxBookReader";
import IconCategory2 from "@/components/Icons/IconCategory2";
import IconClassTeacher from "@/components/Icons/IconClassTeacher";
import IconEdit from "@/components/Icons/IconEdit";
import IconHome from "@/components/Icons/IconHome";
import IconMessageSquare from "@/components/Icons/IconMessageSquare";
import IconUser_male_circle from "@/components/Icons/IconUser_male_circle";
import IconWallet from "@/components/Icons/IconWallet";
import { usePathname } from "next/navigation";
import CartButton from "./CartButton";
import LogoutButton from "./LogoutButton";
import NavigationButton from "./NavigationButton";
import ProfileBtn from "./ProfileBtn";
import TrainingContentButton from "./TrainingContentButton";
import Icon032Book from "@/components/Icons/Icon032Book";
import { useMobilePopup } from "@/lib/MobilePopupContext";

const items = [
  {
    label: "موضوعات",
    href: "/eteqadi-1",
    IconComponent: IconCategory2,
    type: "link",
  },
  {
    label: "محتوای آموزشی",
    href: "/",
    IconComponent: IconBxBookReader,
  },
  {
    label: "خانه",
    href: "/",
    IconComponent: IconHome,
  },
  {
    label: "سبد خرید",
    href: "/cart",
    IconComponent: IconBagHandleOutline,
  },
  {
    label: "پروفایل",
    href: "/profile",
    IconComponent: IconUser_male_circle,
  },
];
export default function MobileBottomNavigation() {
  const pathName = usePathname();
  const { setContent , content , open} = useMobilePopup();
  return (
    <div
       onClick={() => open && setContent({ content: null })} 
      className="fixed bottom-0 left-0 right-0 z-[50] bg-hgray-200 shadow-[0_-1px_3px_0px_#00000020] dark:bg-mdark-600"
    >
      <nav className="flex justify-evenly">
        {pathName.startsWith("/profile") ? (
          <>
            <NavigationButton
              href="/profile/edit"
              label="ویرایش"
              Icon={IconEdit}
            />
            <NavigationButton
              href="/profile/my-class"
              label="کلاس های من"
              Icon={IconClassTeacher}
            />
            <NavigationButton
              href="/profile/wallet"
              label="کیف پول"
              Icon={IconWallet}
            />
            <NavigationButton
              href="/profile/tickets/add"
              label="ارسال تیکت"
              Icon={IconMessageSquare}
            />
            <LogoutButton />
          </>
        ) : pathName.startsWith("/user") ? null : (
          <>
            <NavigationButton
              href="/eteqadi-1"
              label="موضوعات"
              Icon={IconCategory2}
            />
            <TrainingContentButton />
            <NavigationButton href="/" label="خانه" Icon={IconHome} />
            <NavigationButton
              href="/club"
              label="مهدیارشو"
              Icon={Icon032Book}
            />
            {/*    <CartButton /> */}
            <ProfileBtn />
          </>
        )}
      </nav>
    </div>
  );
}
