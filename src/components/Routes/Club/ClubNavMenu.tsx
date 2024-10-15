"use client"

import EmptyButton from "@/components/Assets/EmptyButton";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";

const items = [
  {
    label: "سوالات متداول",
    sectionId: "question",
  },
  {
    label: "نظرات کاربران",
    sectionId: "comment",
  },
  {
    label: "داستان مهدیارشو",
    sectionId: "story",
  },
  {
    label: "پلن های مهدیار شو",
    sectionId: "plans",
  },
  {
    label: "افتخار همکاری",
    sectionId: "cooperation",
  },
];
export default function ClubNavMenu() {
  const handleScroll = (sectionId: string) => {
    const element = document.getElementById(sectionId);

    if (element)
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
  };
  return (
    <div className="relative px-6">
      <span className="absolute dark:text-text-dark-5 text-hgray-300 inline-block lg:hidden left-0 top-1">
        <IconChevronLeft width={22} height={22} />
      </span>
      <span className="absolute dark:text-text-dark-5 text-hgray-300 inline-block lg:hidden right-0 top-1">
        <IconChevronLeft className="rotate-180" width={22} height={22} />
      </span>
      <div className="max-w-full overflow-x-auto scroll-hidden relative justify-between">
        <div className="flex flex-row gap-1 flex-nowrap items-center relative">
          {items.map((item) => (
            <EmptyButton
              key={item.sectionId}
              className="flex items-center min-w-max  text-sm lg:text-base p-2 py-1 bg-primary-300  text-white lg:text-primary-300 dark:text-text-dark-4 lg:bg-transparent rounded-md"
              onClick={() => handleScroll(item.sectionId)}
            >
              {item.label}

              <IconChevronLeft width={20} height={20} />
            </EmptyButton>
          ))}
        </div>
      </div>
    </div>
  );
}
