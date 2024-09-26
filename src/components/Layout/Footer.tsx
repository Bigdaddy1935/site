import ContainerLayout from "@/components/Assets/ContainerLayout";
import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import Skeleton from "@/components/Assets/Skeleton";
import { BlogListItem, CourseListItem } from "@/types";
import React, { Suspense } from "react";

const items = [
  {
    label: "دوره ها",
    href: "/courses",
  },
  {
    label: "رسانه",
    href: "/media",
  },
  {
    label: "صدا و سیما",
    href: "/tv",
  },
  {
    label: "مهدیارشو",
    href: "/club",
  },
  {
    label: "پادکست ها",
    href: "/podcast",
  },
];

const socialLinks = [
  {
    href: "https://www.youtube.com/@seyed_kazem_roohbakhsh",
    image: "/youtube.png",
  },
  {
    href: "https://eitaa.com/seyyed_kazem_roohbakhsh",
    image: "/eitaa.png",
  },
  {
    href: "https://rubika.ir/seyyed_kazem_roohbakhsh",
    image: "/rubika.png",
  },
  {
    href: "https://www.instagram.com/seyyed_kazem_roohbakhsh",
    image: "/instagram.png",
  },
  {
    href: "https://t.me/poshtybanman",
    image: "/telegram.png",
  },
  {
    href: "https://x.com/kazemroohbakhsh",
    image: "/x.png",
  },
];

const getLeatestArticle = async () => {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/articles/latest`,
    {
      next: { revalidate: 7200 },
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let jsonData = await data.json();

  return jsonData;
};

const getMostLikeCourses = async () => {
  let data = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/home/MostLike?type=course`,
    {
      next: { revalidate: 7200 },
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  );
  let jsonData = await data.json();

  return jsonData;
};
async function Footer() {
  const latestArticle = await getLeatestArticle();
  const mostLikes = await getMostLikeCourses();

  return (
    <footer className="mt-24 relative z-30">
      <div className="h-[55px] border-r-[94vw] border-t-[55px]  border-solid border-r-mdark-600 border-t-transparent lg:h-[120px] lg:border-r-[98vw] lg:border-t-[120px]"></div>
      <div className="bg-mdark-600 py-8 text-hgray-200">
        <ContainerLayout>
          <div className="flex flex-col items-center justify-between gap-[3%] lg:flex-row-reverse">
            <div className="bg-tr mb-[-100px] h-[400px] w-[20rem] translate-y-[-110px] bg-[url(/footer-banner.png)] bg-cover bg-no-repeat">
              <div className="flex h-[400px] w-full select-none flex-col items-center justify-center gap-y-6">
                <p className="text-3xl">آیا می دانید</p>
                <p className="text-5xl font-bold text-primary-300">90%</p>
                <p className="text-3xl">محتواهای</p>
                <p className="text-3xl">آکادمی روح بخش</p>
                <p className="text-3xl">
                  <span className="text-primary-300">رایگان</span> است
                </p>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-medium">{"درباره آکادمی روح بخش"}</h2>
              <p className="mt-4 text-justify text-sm leading-8 text-hgray-350">
                {`تلاش ما در آکادمی روح بخش این است که محتوا و مفاهیم اسلامی را از
                جهت های مختلف بررسی کرده (توسعه فردی، اعتقادات، روانشناسی و
                احکام شرعی) و با متخصصین هر موضوع محتواهای متعددی بسازیم، در
                قالب ویدئو، متن و از همه مهم تر تولید دوره های آموزشی که به
                مخاطب در راستای درک کامل یک موضوع به صورت درس به درس کمک بسزایی
                میکند.`}
              </p>
            </div>
          </div>
          <div className="flex flex-col justify-between  gap-[3%]  max-lg:mt-8 lg:flex-row  lg:items-center">
            <div className="flex flex-1 flex-col justify-between lg:flex-row">
              <div className="flex-1  max-lg:mt-8">
                <h4 className="mb-3 text-lg font-medium">
                  دوره های آموزشی محبوب
                </h4>

                <Suspense
                  fallback={[...Array.from({ length: 5 })].map((_, index) => (
                    <Skeleton key={index} width={"65%"} height={15} />
                  ))}
                >
                  {mostLikes?.slice(0, 5).map((item: CourseListItem) => (
                    <NextLink
                      className="block py-1.5 text-sm transition-colors hover:text-primary-100"
                      key={item.id}
                      href={`/course/course-${item.id}`}
                    >
                      <span className="ml-2 inline-block h-[8px] w-[8px] rounded-full bg-primary-300 shadow-[0px_0px_0px_3px_rgba(0,163,144,0.3)]"></span>
                      {item.course_title}
                    </NextLink>
                  ))}
                </Suspense>
              </div>
              <div className="flex-1  max-lg:mt-8">
                <h4 className="mb-3 text-lg font-medium">دسترسی سریع</h4>

                {items.map((item, index) => (
                  <NextLink
                    className="block py-1.5 text-sm transition-colors hover:text-primary-100"
                    key={item.label}
                    href={item.href}
                  >
                    <span className="ml-2 inline-block h-[8px] w-[8px] rounded-full bg-primary-300 shadow-[0px_0px_0px_3px_rgba(0,163,144,0.3)]"></span>
                    {item.label}
                  </NextLink>
                ))}
              </div>
            </div>

            <div className="w-[20rem] max-lg:mx-auto  max-lg:mt-8">
              <div className="">
                <h4 className="mb-3 text-lg font-medium max-lg:text-center">
                  بلاگ آکادمی روح بخش
                </h4>
                <div className="flex flex-wrap justify-between">
                  <Suspense
                    fallback={Array.from({ length: 8 }).map((_, index) => (
                      <Skeleton
                        key={index}
                        width={"80"}
                        height={"80"}
                        className="ml-1"
                      />
                    ))}
                  >
                    {latestArticle?.slice(0, 8).map((item: BlogListItem) => (
                      <NextLink
                        key={item.id}
                        className="group relative mb-2 w-[25%] px-2"
                        href={`/article/content-${item.id}`}
                      >
                        <Image
                          width={80}
                          height={80}
                          alt=""
                          src={item.picture ?? "/temp-images/course-card.jpg"}
                          className="rounded-md object-contain object-center"
                        />

                        <span className="absolute bottom-[100%] left-0 z-20 hidden min-w-[200px] translate-x-[-30%] translate-y-[-14px] rounded-lg bg-black text-white opacity-0 transition-opacity group-hover:inline-block group-hover:opacity-100">
                          <span className="relative inline-block p-2 text-center text-sm font-light">
                            {item.title}
                            <span className="absolute bottom-[0] left-[50%] h-[7px] w-[7px] translate-x-[-50%] translate-y-[100%] border-[7px] border-solid border-b-transparent border-l-transparent border-r-transparent border-t-black"></span>
                          </span>
                        </span>
                      </NextLink>
                    ))}
                  </Suspense>
                </div>
              </div>

              <div className="mt-4 flex justify-center gap-4">
              {/*   <a
                  referrerPolicy="origin"
                  target="_blank"
                  href="https://trustseal.enamad.ir/?id=348262&Code=Pa2pW7Yo0nLprgD51wQIdxurnucHotxY"
                >
                  <img
                    referrerPolicy="origin"
                    src="https://trustseal.enamad.ir/logo.aspx?id=348262&Code=Pa2pW7Yo0nLprgD51wQIdxurnucHotxY"
                    alt=""
                    style={{
                      cursor: "pointer",
                      width: "100px",
                      height: "100px",
                    }}
                    code="Pa2pW7Yo0nLprgD51wQIdxurnucHotxY"
                  />
                </a> */}
                {/* <Image
                  className="rounded-lg"
                  width={100}
                  height={100}
                  alt=""
                  src={"/temp-images/enamad.jpg"}
                />
                <Image
                  className="rounded-lg"
                  width={100}
                  height={100}
                  alt=""
                  src={"/temp-images/saman.png"}
                /> */}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center max-lg:mt-8">
            <div className="flex justify-center gap-3">
              {socialLinks.map((item) => (
                <NextLink
                  key={item.href}
                  className="rounded-md bg-hgray-200 p-1 flex items-center justify-center"
                  href={item.href}
                  target="_blank"
                >
                  <Image
                    className="object-center"
                    width={45}
                    height={45}
                    src={item.image}
                    alt=""
                  />
                </NextLink>
              ))}
            </div>

            <p className="mt-4 text-center text-sm">
              تمامی حقوق برای آکادمی روح بخش محفوظ است.
            </p>
            <p className="mt-2 text-center text-sm">
              طراحی و پیاده سازی توسط تیم برنامه نویسی آکادمی روحبخش
            </p>
          </div>
        </ContainerLayout>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
