import ContainerLayout from "@/components/Assets/ContainerLayout";
import PageTitle from "@/components/Assets/PageTitle";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import GalleyItem from "@/components/Routes/Gallery/GalleyItem";
import { GalleryItem as GalleryItemType } from "@/types";
import { Suspense } from "react";
import LoadingBox from "@/components/Assets/LoadingBox";
import { getAcademyGallery } from "@/lib/fetch";

export const metadata = {
  title: `گالری | آکادمی روحبخش`,
};

export default async function GalleryPage() {
  const galley = await getAcademyGallery();

  return (
    <ContainerLayout>
      <div className="my-10 flex-col">
        <HeaderSetTitle label={"گالری آکادمی"} />
        <PageTitle title="گالری آکادمی" />

        <Suspense fallback={<LoadingBox />}></Suspense>
        <div className="mt-16 flex flex-col gap-5">
          {galley.map((item: GalleryItemType) => (
            <GalleyItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </ContainerLayout>
  );
}
