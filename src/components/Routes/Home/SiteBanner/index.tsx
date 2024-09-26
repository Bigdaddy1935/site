import Container from "@/components/Assets/Container"
import Image from "@/components/Assets/Image"
import NextLink from "@/components/Assets/NextLink"
import { Fragment } from "react"
import Scripts from "./Scripts"


const items = [
    {
        title: "دوره ها",
        href: "/courses",
        image: "/temp-images/banner1.jpg",
        des1: "توضیحاتی کوتاه در مورد دوره ها",
        des: "صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها و شرایط س",
    },
    {
        title: "مقالات",
        href: "/articles",
        image: "/temp-images/banner2.jpg",
        des1: "توضیحاتی کوتاه در مورد مقالات",
        des: "طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم اس",
    },
    {
        title: "رسانه",
        href: "/media/medias",
        image: "/temp-images/banner3.webp",
        des1: "توضیحاتی کوتاه در مورد رسانه ها",
        des: " تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی و فرهنگ پیشرو",
    },
    {
        title: "صداوسیما",
        href: "/tv",
        image: "/temp-images/banner1.jpg",
        des1: "توضیحاتی کوتاه در مورد محتوای صدا و سیما",
        des: "فقط درکِ این حکمت است: دیگری نشناختنی است؛ ماتیِ او پرده‌ی ابهامی به روی ی",
    },
    {
        title: "پادکست",
        href: "/podcasts",
        image: "/temp-images/banner2.jpg",
        des1: "توضیحاتی کوتاه در مورد پادکست ها",
        des: "عاشقی از من می‌ خواهد فقط درکِ این حکمت است: دیگری نشناختنی اس",
    },
    {
        title: "محصولات",
        href: "/products",
        image: "/temp-images/banner3.webp",
        des1: "توضیحاتی کوتاه در مورد محصولات",
        des: "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ",
    },
]
export default function SiteBanner() {
    return (
        <section className="lg:h-screen max-h-[960px]">
            <div className="relative h-full">
                <Scripts />
                <Container className="flex-1 w-full  flex flex-col items-start justify-center h-full">
                    {items.map((i, index) => {
                        return (
                            <Fragment key={i.href}>
                                <div className="inline-block">
                                    <h2 className={`py-2 lg:py-5 peer site_banner_title`}>
                                        <NextLink className="text-4xl text-primary-700 dark:text-white dark:hover:text-primary-700 font-bold" href={i.href}>{i.title}</NextLink>
                                    </h2>


                                    <div
                                        style={{ backgroundImage: "linear-gradient(90deg, rgba(255,255,255,1) 0%,rgba(255,255,255,0.3) 60%, rgba(255,255,255,0) 100%);" }}
                                        className={`lg:absolute max-lg:!bg-none lg:px-[6rem] lg:py-3  left-[10%] bottom-[10%] ${index === 0 ? "lg:opacity-100 default-show" : "lg:opacity-0"}`}>
                                        <p className="hidden lg:inline-block text-left  lg:mb-2 text-xl font-semibold text-hgray-600">{i.des1}</p>

                                        <p className="lg:text-left text-sm text-hgray-500 font-medium max-w-[400px]">{i.des}</p>
                                    </div>

                                    <Image className={`object-cover -z-10 hidden lg:inline-block ${index === 0 ? "opacity-100 default-show" : "opacity-0"}`} src={i.image} fill alt="" />

                                </div>


                            </Fragment>
                        )
                    })
                    }
                </Container>
            </div>
        </section>
    )
}
