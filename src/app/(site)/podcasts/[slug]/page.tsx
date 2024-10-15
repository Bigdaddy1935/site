import ArchiveLayout from "@/components/ArchiveLayout";
import Container from "@/components/Assets/Container";
import AudioPlayerProvider from "@/components/Assets/AudioPlayer/AudioPlayerContext";
import { getPodcasts } from "@/lib/fetch";

type Props = {
  params: {
    slug: string;
  };
  searchParams: {
    search: string;
  };
};



export default async function PodcastPage(props: Props) {
  const {
    searchParams: { search },
    params: { slug },
  } = props;

  const categoryId = slug?.split("-").pop() ?? "";

  const podcasts = await getPodcasts(categoryId, search);

  return (
    <Container>
      <AudioPlayerProvider>
        <ArchiveLayout
          pageType="podcast"
          pageTitle="پادکست"
          data={podcasts.data}
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
