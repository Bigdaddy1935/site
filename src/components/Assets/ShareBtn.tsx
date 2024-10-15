"use client";
import IconShare2 from "@/components/Icons/IconShare2";
import useCopyToClipBoard from "@/hooks/useCopyToClipboard";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import EmptyButton from "./EmptyButton";

type Props = {
  url?: string;
  size?: "cart" | "details";
};
export default function ShareBtn(props: Props) {
  const { url, size = "cart" } = props;
  const [origin, setOrigin] = useState("");
  const { copyToClipboard } = useCopyToClipBoard();
  const pathName = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);
  const buttonclass =
    size === "cart"
      ? "border-[#bfbfbf] dark:border-white w-[25px] h-[25px]"
      : " p-0.5";

  return (
    <EmptyButton
      onClick={() =>
        copyToClipboard(
          `${origin}${url ?? pathName}`,
          "لینک در حافظه موقت کپی شد."
        )
      }
      className={twMerge(
        ` text-primary-100 dark:border-white dark:text-white`,
        buttonclass
      )}
    >
      <IconShare2 width={20} height={20} />
    </EmptyButton>
  );
}
