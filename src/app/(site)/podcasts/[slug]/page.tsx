import ArchiveLayout from "@/components/ArchiveLayout";
import Container from "@/components/Assets/Container";
import AudioPlayerProvider from "@/components/Assets/AudioPlayer/AudioPlayerContext";
import { getCategoreis, getPodcasts } from "@/lib/fetch";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    search: string;
  };
};

/* export async function generateStaticParams() {
  const categories = await getCategoreis();

  return categories.map((category: any) => ({
    slug: `${category.slug}-${category.id}`,
  }));
} */
async function fetchMYData(categoryId: string, search: string) {
  try {
    const podcasts = await getPodcasts(categoryId, search);

    return {
      podcasts,
    };
  } catch (error) {
    throw new Error("Failed to fetch revenue data.");
  }
}

export default async function PodcastPage(props: Props) {
  const {
    searchParams: { search },
    params: { slug },
  } = props;

  const categoryId = slug?.split("-").pop() ?? "";

  const { podcasts } = await fetchMYData(categoryId, search);

  return (
    <Container>
      <AudioPlayerProvider>
        <ArchiveLayout
          pageType="podcast"
          pageTitle="پادکست"
          data={podcasts?.data}
          mostLikes
          teacherSelectHidden
          filterKeys={{
            title: "search",
            categories: "categoryId",
          }}
        />
      </AudioPlayerProvider>
    </Container>
  );
}
