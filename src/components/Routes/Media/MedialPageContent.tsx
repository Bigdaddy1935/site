import { LessenItem } from "@/types";
import GetMoreItem from "./GetMoreItem";
import FavoritesCarousel from "@/components/FavoritesCarousel";
import SedaVaSimaCard from "@/components/SedaVaSimaCard";

type MediaPageContentProps = {
  route: {
    url: string;
    method?: "post" | "get";
  };

  lessons: LessenItem[];
};
export default function MediaPageContent(props: MediaPageContentProps) {
  const { route, lessons } = props;
  return (
    <div className="my-14 flex w-full lg:px-4 lg:max-w-screen-xl  lg:items-end  flex-col gap-6 max-lg:my-32">
      <FavoritesCarousel
        type={"media"}
        cartType={"mostLikes"}
        title={`محبوب ترین رسانه ها`}
      />

      <div className="grid w-full grid-cols-1 justify-between gap-5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {lessons.map((item) => (
          <SedaVaSimaCard key={item.id} {...item} />
        ))}
        <GetMoreItem route={route} />
      </div>
    </div>
  );
}
