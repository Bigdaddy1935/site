import ActiveLink from "@/components/Assets/ActiveLink";
import Hidden from "@/components/Assets/Hidden";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import { CourseListItem } from "@/types";
import { PaginateData } from "@/types/response";

type Props = {
  courseId: number;
  courses : PaginateData<CourseListItem>
};


export default async function SedaVaSimaSidebar(props: Props) {
  const { courseId , courses } = props;

  const items =
    courses?.data.map((item) => ({
      title: item?.course_title,
      href: `/course-${item.id}`,
      id: item.id,
    })) ?? [];
  return (
    <div className="shadow-sp sticky bottom-0 right-0 top-[60px] z-20  h-[45px] w-full bg-white dark:bg-mdark-600 max-lg:top-[65px] lg:h-[98vh] lg:w-[230px] lg:p-4 lg:pt-14 lg:shadow-2xl">
      <h1 className="hidden text-center text-2xl font-semibold text-primary-700 dark:text-mdark-300 lg:block lg:text-4xl">
        صدا و سیما
      </h1>
      <Hidden hidden="lg">
        <HeaderSetTitle label={items.find((i) => i.id === courseId)?.title} />
      </Hidden>
      <div className="relative flex  h-full items-center max-lg:justify-evenly lg:flex-col lg:items-stretch lg:pt-10">
          {items.map((item) => (
            <ActiveLink
              poinerClass="right"
              key={item.href}
              defaultLink={{ link: `/tv${items[0]?.href}` }}
              activeClassName="text-primary-300 dark:text-text-dark-2 bg-primary-50 dark:bg-mdark-400"
              className="block rounded-md border-b  border-solid border-hgray-200 px-3 text-center text-primary-700 dark:border-mdark-600 dark:text-hgray-200 lg:my-2 lg:py-6 lg:text-lg"
              href={`/tv${item.href}`}
            >
              {item.title}
            </ActiveLink>
          ))}
      </div>
    </div>
  );
}
