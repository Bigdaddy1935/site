"use client";
import BoxButton from "@/components/Assets/BoxButton";
import Button from "@/components/Assets/Button";
import EmptyButton from "@/components/Assets/EmptyButton";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";
import IconLock from "@/components/Icons/IconLock";
import useNextRouter from "@/hooks/useNextRouter";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";

type Props = {};

const terms = [
  {
    label: "ترم اول",
  },
  {
    label: "ترم دوم",
  },
];

export default function ClubTermList({}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {terms.map((item, index) => (
        <TermItem
          key={index}
          termNumber={index + 1}
          current={index === 0}
          {...item}
        />
      ))}
    </div>
  );
}

function TermItem({
  current,
  label,
}: {
  current: boolean;
  label: string;
  termNumber: number;
}) {
  const router = useNextRouter();
  return (
    <BoxButton
      showTextInMobile
      onClick={() => router.push("/club/term/1")}
      text={
        <span className="flex items-center">
          <span className="text-lg font-medium  text-hgray-600 dark:text-text-dark-3">
            {label}
          </span>
        </span>
      }
      leftContent={
        current ? (
          <EmptyButton
            onClick={() => router.push("/club/term/")}
            className="text-primary-100 text-sm lg:text-base font-medium flex items-center"
          >
            مشاهده
            <IconChevronLeft width={22} height={22} className="mr-1" />
          </EmptyButton>
        ) : (
          <div className="flex items-center text-hgray-400 dark:text-text-dark-4">
            <p className="mr-2 text-sm lg:text-base font-medium pl-3 text-hgray-600 dark:text-text-dark-4">
              بزودی
            </p>
            <IconLock width={18} height={18} />
          </div>
        )
      }
    />
  );
}

function TermProgress({ progress }: { progress: number }) {
  return (
    <div className="flex w-full max-w-80 items-center justify-between">
      <p className="text-sm font-medium text-primary-300">درصد پیشرفت</p>
      <div style={{ width: `${progress}%` }} className="ltr">
        <p className="rounded-xl bg-primary-100 px-2 py-1.5 text-right text-sm text-white">
          {progress}%
        </p>
      </div>
    </div>
  );
}
