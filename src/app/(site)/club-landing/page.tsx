import ContainerLayout from "@/components/Assets/ContainerLayout";
import Paper from "@/components/Assets/Paper";
import VideoPlayer from "@/components/Assets/VideoPlayer";
import ClubDescription from "@/components/Routes/Club/ClubDescription";
import ClubFaqs from "@/components/Routes/Club/ClubFaqs";
import ClubLeatestComments from "@/components/Routes/Club/ClubLeatestComments";
import ClubRoadMap from "@/components/Routes/Club/ClubRoadMap";
import ClubServices from "@/components/Routes/Club/ClubServices";
import PlanList from "@/components/Routes/Club/PlanList";
import { getLatestComments } from "@/lib/fetch";
import React, { Suspense } from "react";

export const metadata = {
  title: `مهدیار شو | آکادمی روحبخش`,
};
export default async function ClubLanding() {
  const latestComments = await getLatestComments();
  return (
    <ContainerLayout className="my-24 flex flex-col gap-10">
      <div>
        <VideoPlayer
          src="https://dl.poshtybanman.ir/webinar/Stablepersonality/Class1bbsjd.mp4"
          poster={"https://dl.poshtybanman.ir/upload/قسمت 1_664b3f1614611.jpg"}
        />
      </div>

      <PlanList />


      <ClubRoadMap />

      <ClubFaqs />

      <Suspense fallback={null}>
        <ClubLeatestComments items={latestComments?.data} />
      </Suspense>


      <ClubDescription />


      <ClubServices />
    </ContainerLayout>
  );
}
