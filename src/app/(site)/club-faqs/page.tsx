import BackBtn from "@/components/Assets/BackBtn";
import ContainerLayout from "@/components/Assets/ContainerLayout";
import Paper from "@/components/Assets/Paper";
import ClubFaqQuestionList from "@/components/Routes/Club/ClubFaqQuestionList";
export const metadata = {
  title: `مهدیار شو | آکادمی روحبخش`,
};
export default function ClubFaq() {
  return (
    <ContainerLayout className="my-4 justify-start flex h-full flex-col gap-3">
      <BackBtn />
      <Paper className="text-hgray-600 font-bold">
        <h2 className="font-semibold text-primary-700 dark:text-primary-50">
          پاسخ به سوالات پرتکرار شما
        </h2>
      </Paper>
      <ClubFaqQuestionList />
    </ContainerLayout>
  );
}
