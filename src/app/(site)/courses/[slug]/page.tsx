import ArchiveLayout from "@/components/ArchiveLayout";
import Container from "@/components/Assets/Container";
import { Suspense } from "react";
import LoadingBox from "@/components/Assets/LoadingBox";
import { getCategory, getCourses } from "@/lib/fetch";
import { Metadata } from "next";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    search: string;
    teacher: string;
  };
};

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

  const teacherName = teacher ? teacher?.split("_")?.slice(0, -1)?.join(" ") : "";

  const courses = await getCourses(categoryId, teacherName, search);

  return (
    <Container>
      <Suspense fallback={<LoadingBox />}>
        <ArchiveLayout
          pageType="course"
          mostLikes
          pageTitle="دوره ها"
          data={courses.data}
          filters={{
            categoryId: Number(categoryId),
            search,
            teacher: teacherName,
          }}
          filterKeys={{
            course_title: "search",
            course_teacher: "teacher",
            categories: "categoryId",
          }}
        />
      </Suspense>
    </Container>
  );
}
