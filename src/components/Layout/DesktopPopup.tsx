import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  innerClassName?: string;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
export default function DesktopPopup(props: Props) {
  const { children, className, innerClassName, ...allProps } = props;
  return (
    <React.Fragment>
      <div
        {...allProps}
        className={clsx(
          className,
          `w-screen shadow-md opacity-0  lg:group-hover:opacity-100 lg:group-hover:z-[-1] top-[-100%] transition-all duration-700 fixed right-0 left-0 -z-[20] group-hover:z-20 group-hover:top-[100px] pt-[15px]`
        )}
      >
        <div
          className="px-4 py-8 bg-white  dark:bg-mdark-600"
        >
          <div
            className={twMerge(
              "max-w-screen-2xl relative px-3 lg:px-16 items-stretch  mx-auto flex justify-between max-h-full",
              innerClassName
            )}
          >
            {children}
          </div>
        </div>
      </div>
      {/*         <div className="fixed w-screen bottom-0 right-0 left-0 h-0 lg:group-hover:h-[calc(100vh-190px)] bg-black/10 -z-[20] lg:group-hover:z-[-2]"></div>
       */}{" "}
    </React.Fragment>
  );
}
