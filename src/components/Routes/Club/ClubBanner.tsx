import Container from "@/components/Assets/Container";
import EmptyButton from "@/components/Assets/EmptyButton";

export default function ClubBanner() {
  return (
    <div
      style={{ backgroundSize: "100% 100%" }}
      className=" w-full bg-cover bg-[url(/club.jpg)]  h-[120px] lg:h-[230px] bg-no-repeat mb-11"
    >
      <Container className="relative flex h-full flex-col justify-center">
        {/* <p className="glass-bg max-w-lg rounded-xl p-5 text-lg font-normal leading-8 text-white ">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک در
          شصت و سه
        </p> */}

        {/* <div className="absolute bottom-0 left-0 right-0 flex justify-end">
          <EmptyButton className="rounded-t-2xl text-sm bg-primary-300 ml-4 p-3 text-hgray-200">
            معرفی به دوستان
          </EmptyButton>
          <EmptyButton className="rounded-t-2xl text-sm bg-hgray-300 p-3 text-hgray-600">
            درصد پیشرفت و نمرات
          </EmptyButton>
        </div> */}
      </Container>
    </div>
  );
}
