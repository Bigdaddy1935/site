import { getCategoreis, getCategory, getCourses } from "@/lib/fetch";
import { Metadata } from "next";
import CoursesPageClient from "@/components/Routes/Courses/CoursesPageClient";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    search: string;
    teacher: string;
  };
};

export async function generateStaticParams() {
  const categories = await getCategoreis();

  return categories.map((category: any) => ({
    slug: `${category.slug}-${category.id}`,
  }));
}
async function fetchMYData(
  categoryId: string | null | undefined,
  teacherName: string,
  search: string
) {
  try {
    const courses = await getCourses(categoryId, teacherName, search);

    return {
      courses,
    };
  } catch (error) {
    throw new Error("Failed to fetch revenue data.");
  }
}
export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const categoryId = slug ? slug?.split("-").pop() : null;
  let category = null;
  if (categoryId) {
    category = await getCategory(+categoryId);
  }

  return {
    title: category
      ? `دوره های ${category?.name} | آکادمی روح بخش`
      : "دوره های آکادمی روح بخش",
  };
}

export default async function CoursesPage(props: Props) {
  const {
    searchParams: { search, teacher },
    params: { slug },
  } = props;

  const categoryId = slug ? slug?.split("-").pop() : null;

  const teacherName = teacher
    ? teacher?.split("_")?.slice(0, -1)?.join(" ")
    : "";

  const { courses } = await fetchMYData(categoryId, teacherName, search);

  return (
    <CoursesPageClient
      courses={courses}
      filters={{
        categoryId: categoryId ? Number(categoryId) : null,
        search,
        teacher: teacherName,
      }}
    />
  );
}
