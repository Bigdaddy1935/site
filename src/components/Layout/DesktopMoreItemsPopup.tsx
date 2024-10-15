"use client"
import EmptyButton from "../Assets/EmptyButton";
import Hidden from "../Assets/Hidden";
import IconCaretDown from "../Icons/IconCaretDown";
import AppDownload from "./AppDownload";
import DesktopPopup from "./DesktopPopup";
import MoreItemsMenu from "./MoreItemsMenu";

export default function DesktopMoreItemsPopup() {
  return (
    <div
      onMouseEnter={() =>
        document.body.classList.add("scroll-hidden", "overflow-hidden")
      }
      onMouseLeave={() =>
        document.body.classList.remove("scroll-hidden", "overflow-hidden")
      }
      onClick={() =>
        document.body.classList.remove("scroll-hidden", "overflow-hidden")
      }
      className="group flex w-full lg:w-auto  lg:items-center lg:justify-start"
    >
      <Hidden hidden="max-lg">
        <EmptyButton className="rtr peer mr-3 flex w-full items-center font-semibold text-primary-300 dark:text-mdark-300 lg:w-auto ">
          بیشتر
          <IconCaretDown width={22} height={22} />
          <div className="mx-3  block h-0.5 flex-1 bg-hgray-300 dark:bg-mdark-400" />
        </EmptyButton>
      </Hidden>
      <DesktopPopup>
        <div className="flex-1 px-4">
          <MoreItemsMenu />
        </div>

        {/* 
            <div className="w-0.5 bg-hgray-300 dark:bg-mdark-400" />
            <div className="flex-1 px-4">

                 <TeacherList /> 
            </div> */}

        <div className="w-0.5 bg-hgray-300 dark:bg-mdark-400" />

        <div className="flex-1 px-4">
          <AppDownload />
        </div>
      </DesktopPopup>
    </div>
  );
}
