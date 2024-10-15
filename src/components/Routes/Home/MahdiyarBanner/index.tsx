import NextLink from "@/components/Assets/NextLink";

export default function MahdiyarBanner() {
  return (
    <NextLink
      href={"/club"}
      style={{ backgroundSize: "100% 100%" }}
      className='rounded-lg flex flex-col items-center justify-center bg-[url("/club.jpg")] h-[120px] lg:h-[230px] bg-no-repeat bg-primary-300 p-8'
    ></NextLink>
  );
}
