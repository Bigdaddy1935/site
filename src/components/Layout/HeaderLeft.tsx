"use client";
import AppDownloadLink from "@/components/Assets/AppDownloadLink";
import BackBtn from "@/components/Assets/BackBtn";
import EmptyButton from "@/components/Assets/EmptyButton";
import Hidden from "@/components/Assets/Hidden";
import IconDownload16 from "@/components/Icons/IconDownload16";
import IconSun from "@/components/Icons/IconSun";
import IconWeatherNight from "@/components/Icons/IconWeatherNight";
import { useThemeSwitch } from "@/hooks/useThemeSwitch";
import { usePathname } from "next/navigation";
import CartPopup from "./CartPopup";
import SearchBox from "./SearchBox";
import UserMenu from "./UserMenu";
import { useAppSelector } from "@/lib/reduxHooks";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import CartButton from "./MobileBottomNavigation/CartButton";
import CartLink from "./CartLink";

export default function HeaderLeft() {
  const pathName = usePathname();
  return (
    <div className="flex max-lg:flex-1 lg:pr-9 items-center justify-end">
      <Hidden hidden="lg">
        {(() => {
          if (pathName.startsWith("/profile"))
            return (
              <BackBtn
                w={36}
                leftIcon
                rightIcon={false}
                link="/"
                text="بازگشت به سایت"
              />
            );

          if (pathName === "/") return <SearchBox homePage />;

          return (
            <>
              <DarkModeSwich />
              <SearchBox />
            </>
          );
        })()}

        <CartLink label={false} />
      </Hidden>

      <Hidden hidden="max-lg">
        <HeaderLeftContent />
      </Hidden>
    </div>
  );
}

function HeaderLeftContent() {
  const user = useAppSelector(selectUser);
  return (
    <>
      <DarkModeSwich />
      <AppDownloadLink className="ml-3 font-medium text-primary-300 dark:text-white bg-hgray-300 dark:bg-mdark-400 rounded-full p-2">
        <IconDownload16 width={24} height={24} />
      </AppDownloadLink>
      {user ? <CartPopup /> : null}
      <UserMenu />
    </>
  );
}

function DarkModeSwich() {
  const { mode, setMode } = useThemeSwitch();
  return (
    <EmptyButton
      className="ml-3 font-medium text-primary-300 dark:text-white bg-hgray-300 dark:bg-mdark-400 rounded-full p-2"
      onClick={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      {mode === "dark" ? (
        <IconSun width={24} height={24} />
      ) : (
        <IconWeatherNight width={24} height={24} />
      )}
    </EmptyButton>
  );
}
