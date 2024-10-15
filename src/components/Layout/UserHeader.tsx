import Container from "@/components/Assets/Container";
import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";

export default function UserHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-hgray-300 bg-hgray-100 dark:border-mdark-400 dark:bg-mdark-600">
      <Container className="flex  h-[4rem] items-center justify-center">
        <NextLink
          href={"/"}
          className="relative inline-block h-12 w-[4rem] lg:w-[13rem]"
        >
          <Image
            className="object-contain"
            src={"/logo.png"}
            alt="آکادمی روح بخش"
            width={100}
            height={50}
            priority
          />
        </NextLink>
      </Container>
    </header>
  );
}
