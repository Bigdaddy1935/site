import IconHome from "@/components/Icons/IconHome";
import { lessonMediaType, lessonType } from "@/constant/constants";
import Link from "next/link";
import { CourseItem, LessenItem, ProductListItem } from "@/types/";

const homeItem = {
  label: <IconHome />,
  href: "/",
};

type BreadCrumbItem = {
  label: string | undefined;
  href: string | undefined;
};
type Props = {
  items: BreadCrumbItem[];
};
export default function BreadCrumb({ items }: Props) {
  return (
    <div className="flex gap-5 my-11">
      {[homeItem, ...items].map((item, index) => (
        <BreadCrumbItem
          key={index}
          {...item}
          lastItem={index === items.length}
          firstItem={index === 0}
        />
      ))}
    </div>
  );
}

type BreadCrumbItemProps = {
  label: string | React.ReactNode | undefined;
  href: string | undefined;
  lastItem?: boolean;
  firstItem?: boolean;
};
function BreadCrumbItem({
  label,
  href = "#",
  lastItem,
  firstItem,
}: BreadCrumbItemProps) {
  return (
    <div
      className={`bg-hgray-200 dark:bg-mdark-600 dark:text-white h-[40px] flex items-center relative ${lastItem && "flex-1 rounded-l-md"} ${firstItem && "rounded-r-md"}`}
    >
      {!firstItem && (
        <span className="absolute z-[10] w-[20px] right-[-10px] top-0 bottom-0 border-b-[20px] border-t-[20px] border-r-[10px] border-y-hgray-200 dark:border-y-mdark-600 border-solid  border-r-transparent" />
      )}
      <Link
        className={`relative block z-[20] px-2 ${lastItem ? "font-medium" : "font-light"}`}
        href={href}
      >
        {label}
      </Link>
      {!lastItem && (
        <span className="absolute z-[10] w-[20px] left-[-20px] top-0 bottom-0 border-b-[20px] border-t-[20px] border-r-[10px] border-y-transparent border-solid  border-r-hgray-200 dark:border-r-mdark-600" />
      )}
    </div>
  );
}

type LessonBreadCrumpProps = {
  lesson: LessenItem;
};
export function LessonBreadCrump({
  lesson: { courses, ...lessonData },
}: LessonBreadCrumpProps) {
  const createMediaLessonItems = (): BreadCrumbItem[] => {
    return [
      {
        label: "رسانه",
        href: "/media/medias",
      },
      {
        label: lessonMediaType[courses?.type]?.label,
        href: `/media/${lessonMediaType[courses?.type]?.href}`,
      },
      {
        label: courses?.course_title,
        href: `/media/${lessonMediaType[courses?.type]?.href}/course-${courses.id}`,
      },
    ];
  };
  const createTvLessonItems = (): BreadCrumbItem[] => {
    return [
      {
        label: "صدا و سیما",
        href: "/tv",
      },
      {
        label: courses?.course_title,
        href: `/tv/course-${courses.id}`,
      },
    ];
  };
  const createPodcastLessonItems = (): BreadCrumbItem[] => {
    return [
      {
        label: "پادکست ها",
        href: "/podcasts",
      },
      {
        label: lessonData.categories[0]?.name,
        href: `/podcasts/${lessonData.categories[0]?.slug}-${lessonData.categories[0]?.id}`,
      },
    ];
  };
  const createClubLessonItems = (): BreadCrumbItem[] => {
    return [
      {
        label: "باشگاه مهدیار شو",
        href: "/club/term/1",
      },
      {
        label: courses?.course_title,
        href: `/${courses?.type}/${courses?.type}-${courses.id}`,
      },
    ];
  };
  const createDefaultLessonItems = (): BreadCrumbItem[] => {
    return [
      {
        label: lessonType[courses?.type]?.label,
        href: `/${lessonType[courses?.type]?.href}`,
      },
      {
        label: lessonData?.categories[0]?.name,
        href: `/${lessonType[courses?.type]?.href}/${lessonData?.categories[0]?.slug}-${lessonData?.categories[0]?.id}`,
      },
      {
        label: courses?.course_title,
        href: `/${courses?.type}/${courses?.type}-${courses?.type === "product" ? courses.products?.id : courses.id}`,
      },
    ];
  };
  const createBreadCrump = () => {
    switch (courses?.type) {
      case "media":
      case "mahdyar":
      case "kolbe":
        return createMediaLessonItems();
      case "tv":
        return createTvLessonItems();
      case "podcast":
        return createPodcastLessonItems();
      case "club":
        return createClubLessonItems();
      default:
        return createDefaultLessonItems();
    }
  };
  return <BreadCrumb items={createBreadCrump()} />;
}
