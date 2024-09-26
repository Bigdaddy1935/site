import Hidden from "@/components/Assets/Hidden";
import NextLink from "@/components/Assets/NextLink";
import IconCart3 from "@/components/Icons/IconCart3";
import IconClassTeacher from "@/components/Icons/IconClassTeacher";
import IconDarkMode from "@/components/Icons/IconDarkMode";
import IconGalleryImage from "@/components/Icons/IconGalleryImage";
import IconLogout from "@/components/Icons/IconLogout";
import IconMessageSquare from "@/components/Icons/IconMessageSquare";
import IconNewsLetter from "@/components/Icons/IconNewsLetter";
import IconUserSupprt from "@/components/Icons/IconUserSupprt";
import CartLink from "./CartLink";
import DarkModeSwich from "./DarkModeSwich";
import LogoutBtn from "./LogoutBtn";
import ManagerOnlyBtn from "./ManagerOnlyBtn";
import WalletButton from "./WalletButton";
import NewsButton from "./NewsButton";
import MyClassesLink from "./MyClassesLink";
const items = [
  {
    title: "سبد خرید",
    href: "cart",
    icon: IconCart3,
  },
  {
    title: "اخبار جدید",
    href: "news",
    icon: IconNewsLetter,
  },
  {
    title: "گالری آکادمی",
    href: "/academy-gallery",
    icon: IconGalleryImage,
  },
  {
    title: "پشتیبانی + سوالات متداول",
    href: "/faq",
    icon: IconUserSupprt,
  },
  {
    title: "حالت شب",
    href: "darkmode",
    icon: IconDarkMode,
  },
  {
    title: "کلاس های من",
    href: "my-class",
    icon: IconClassTeacher,
  },
  {
    title: "مدیریت تیکت ها",
    href: "manage-tickets",
    icon: IconMessageSquare,
  },
  {
    title: "مدیریت نظرات",
    href: "manage-comments",
    icon: IconMessageSquare,
  },
  {
    title: "خروج از حساب کاربری",
    href: "logout",
    icon: IconLogout,
  },
];
export default function MoreItemsMenu() {
  return (
    <div className="">
      {items.map((item) => {
        if (item.href === "darkmode") return <DarkModeSwich />;
        if (item.href === "news") return <NewsButton />;
        if (item.href === "my-class") return <MyClassesLink />;
        if (item.href === "logout")
          return (
            <Hidden hidden="lg">
              <LogoutBtn />
            </Hidden>
          );
        if (item.href.startsWith("manage"))
          return (
            <Hidden hidden="lg">
              <ManagerOnlyBtn href={item.href} title={item.title} />
            </Hidden>
          );

        if (item.href === "cart") return <CartLink />;
        return (
          <NextLink
            className="flex items-center px-2 py-3 text-hgray-600 dark:text-white lg:py-1.5 lg:hover:text-primary-300 dark:hover:text-primary-100"
            href={item.href}
            key={item.href}
          >
            <item.icon width={22} height={22} />

            <span className="mr-4 text-base">{item.title}</span>
          </NextLink>
        );
      })}

      <WalletButton />
    </div>
  );
}
