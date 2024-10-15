"use client";
import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import { Category, CourseListItem, KeyValue } from "@/types/";
import { useSearchBox } from "./SearchBoxProvider";

const modelFa: KeyValue = {
  courses: "دوره",
  products: "محصول",
  lessons: "درس",
  podcast: "پادکست",
  articls: "مقاله",
};
type TabContentProps = {
  items: {
    title: string;
    href: string;
    id: number;
    category?: Category;
    course?: CourseListItem;
    model?: string;
  }[];
};
export default function TabContent(props: TabContentProps) {
  const { items } = props;
  const { activeTab, setOpen } = useSearchBox();

  const getCourseHref = (course: CourseListItem | undefined) => {
    if (!course) return "#";
    if (course?.type === "course") return `/course/course-${course.id}`;
    if (course?.type === "product") return `/product/product-${course.id}`;
    if (course?.type === "tv") return `/tv/course-${course.id}`;
    if (course?.type === "podcast") return `/podcast/course-${course.id}`;

    if (course?.type === "media") return `/media/medias/course${course.id}`;

    if (course?.type === "kolbe" || course?.type === "mahdyar")
      return `/media/${course?.type}/course-${course.id}`;

    return "#";
  };

  const getCategoryHref = (
    category: Category | undefined,
    course: CourseListItem | undefined
  ) => {
    if (course?.type === "course")
      return `/courses/${category?.slug}-${category?.id}`;
    if (course?.type === "product")
      return `/products/${category?.slug}-${category?.id}`;
    if (course?.type === "article")
      return `/articles/${category?.slug}-${category?.id}`;
    if (course?.type === "podcast")
      return `/podcast/${category?.slug}-${category?.id}`;

    return "#";
  };
  return (
    <div className=" pt-8">
      <div className="max-h-[40vh] overflow-y-auto custom-scrollbar">
        {items.length ? (
          <>
            {items.map((item) => (
              <div
                onClick={() => setOpen(false)}
                key={`${item.href}-${item.title}`}
                className="max-w-2xl py-2 border-b border-solid border-hgray-200 dark:border-mdark-500 flex justify-between items-center"
              >
                <div className="flex items-center gap-2">
                  {activeTab === "all" && (
                    <p
                      style={{
                        color: item.category?.color,
                        borderColor: item.category?.color,
                      }}
                      className="rounded-md px-2 py-1 border border-solid text-sm font-medium"
                    >
                      {item.model && modelFa[item.model]
                        ? modelFa[item.model]
                        : item.model}
                    </p>
                  )}
                  <NextLink className="dark:text-hgray-200" href={item.href}>
                    {item.title}
                  </NextLink>
                </div>
                <NextLink
                  href={
                    item.model === "lessons"
                      ? getCourseHref(item.course)
                      : getCategoryHref(item.category, item.course)
                  }
                  style={{ color: item.category?.color }}
                  className="rounded-md px-2 py-1 text-sm font-medium"
                >
                  {item.model === "lessons"
                    ? item.course?.course_title
                    : item.category?.name}
                </NextLink>
              </div>
            ))}
          </>
        ) : (
          <div className="flex flex-col lg:flex-row justify-between max-lg:items-center lg:mt-4">
            <p className="text-lg text-hgray-600 dark:text-hgray-200 font-medium">
              موردی یافت نشد
            </p>

            <Image
              src={"/empty-search.jpg"}
              width={130}
              height={100}
              className="object-contain rounded-lg max-lg:max-w-[100px] max-lg:mt-2"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
}
