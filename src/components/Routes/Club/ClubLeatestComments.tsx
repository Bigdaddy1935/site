"use client";
import { EffectCards, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";

import { useRef, useState } from "react";
import SectionTitle from "@/components/Assets/SectionTitle";
import Paper from "@/components/Assets/Paper";
import IconArrowRightShort from "@/components/Icons/IconArrowRightShort";
import IconArrowLeftShort from "@/components/Icons/IconArrowLeftShort";


const items = [
  {
    text: `ولی واقعا کلاس ها خلی مفید و عالی هستن👌
    هر بار که ویدیو جدید رو میبینم، احساس میکنم که کلی مطلب جدید و مفید یاد گرفتم✅
    امروز هم سر کلاس معلممون درباره هدف خداوند از آفرینش انسان پرسید و تنها کسی که جواب داد من بودم شاید یه سوال خیلی جزئی رو جواب داده باشم اما اینکه فقط من توی کلاس جوابش رو میدونستم، خیلی بهم احساس خوبی میده😁 و همون معلم یکسری مطلب راجب رشد فردی توضیح داد که من همه رو بلد بود😌😁
    در کل خواستم بگم که واقعا همه چییییی عالیه و انشاالله دوره بعدی رو حتما حتما شرکت میکنم😍`,
    username: "",
  },
  {
    text: `سلام من واقعا از آقای سید کاظم روح بخش خیلی تشکر میکنم به خاطر برنامه ریزی که به من یاد دادن و خیلی کمکم کردن و زندگیم واقعا نجات پیدا کرد از استرس و هول شدن  من فکر میکردم همیشه باید تو زهنم برنامه ریزی کنم که هی استرس داشتم هول می‌شودم  کارام به موقع انجام نمی شد اما الان به همه ی کارام میرسم`,
    username: "",
  },
  {
    text: `الحمدالله تابستان امسال با کلیپ ها وآموزش ها بسیار خوب و پربار بود برای پسرم
    از شما وهمه‌عوامل این مجموعه و استاد بزرگوار سپاسگزاریم.`,
    username: "",
  },
  {
    text: `سلام و عرض ادب. 
    بابت پشتیبانی های شما ممنونم.
    واقعا از این که در این کلاس ثبت نام کرده ام بسیار مسرورم.
    
    خدا قوت به آقای روح بخش و تیم ایشان با این همه نکات عالی که می فرمایند، واقعا در این دوره به علم انسان افزوده می شود.
    
    فقط دو نکته ای که در کلاس های احکام دیدم  و احساس کردم با این که ایشان تسلط کامل دارند و انسان جایزالخطا می باشند عرض می کنم.
    در جلسه ی ۲۰‌احکام مثالی برای نماز صبح زدند که تشهد داشت.
    در جلسه ی ۲۰ احکام هم سوره ی صافات را جزء سور سجده دار بیان کردند.`,
    username: "",
  },
  {
    text: `سلام
    یک پیشنهاد به ذهنم رسید! گفتم بگم شاید مفید باشه
    بنظرم یکبار یک نماز چهار رکعتی بدون هیچ مستحباتی و فقط و فقط واجبات بخونین و فیلمش رو توی کانال بفرستین تا ما ببینیم خیلی خوب میشه`,
    username: "",
  },
  {
    text: `ولی آخوند باحالی هستید 
    منم به عنوان نوجوون ۱۷ ساله میگم خیلی باصفا هستید 😁🌹`,
    username: "",
  },
  {
    text: `پس بزارین منم یه تشکر کنم؛ 
    خب تو این دوروزمونه وقتی از همه جا بریده بودم با استاد اشنا شدم 
    وقتی زندگیم داشت ب داغونی میرفت با حرفای استاد برگشتم 
    وقتی بابام بخاطر کارام تو دعوا تهدیدم میکرد(فک کن انقد وضعم داغون شده بود ک بابام تهدیدو با بغض بهم میگفت و قسم میخورد که نمیبخشمت)💔🚶‍♀️
    حرفای استاد یکار کرد بشم دردونه بابام:)) 
    وقتی به گذشتم به کارایی که تو اوج نوجوونی کردم فکر میکنم میبینم که خیلی بیشتر از سنم شاید اندازه یه زن ۴٠ ساله خودمو لای گناهام گم کردم
    هعیییی:(((
    ولی خداروشکر که با شما آشنا شدم تغییر کردم،چادری شدم و.... 
    خیلی مدیون شما و استادا هستم  
    مخصوصا خود اقای روحبخش که کل زندگیه الانمو مدیونشونم
    واقعا از ته دلم میگم که ازتون ممنونم برای همه چی و مدیونتونم:) ❤️‍🩹`,
    username: "",
  },
  {
    text: `من از چند ماه قبل یه سری برنامه داشتم و الان دارم تو اون مسیر قدم برمیدارم و تلاش میکنم 
    یه برنامه غذایی منظم، ورزش هر‌روزه و منظم و خیلی چیزای دیگه
    یکی از دلایلی هم که تو این دوره ثبت‌نام کردم برای ایجاد یه شخصیت قوی و عالی برای خودمه
    خلاصش اینکه میخوام بهترینِ خودم باشم و هنوز کلی راه نرفته دارم😁😎`,
    username: "",
  },
];

export default function ClubLeatestComments() {
  const [_, setInit] = useState<boolean>();
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  return (
    <div className="flex flex-col justify-center lg:flex-row lg:justify-between">
      <div className="flex flex-1 lg:items-center lg:justify-center">
        <SectionTitle
          title="درمورد مهدیار شو چه میگویند؟"
          subTitle="اینها بخش کوچکی از نظراتی هستند که افراد مختلف در مورد دوره مهدیار شو دارند."
        />
      </div>

      <div className="flex-1">
        <div className="max-w-full  overflow-hidden lg:flex lg:justify-center">
          <Swiper
            onInit={() => setInit(true)}
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            navigation={{
              enabled: true,
              disabledClass: "!text-hgray-400",
              nextEl: nextRef.current,
              prevEl: prevRef.current,
            }}
            slideNextClass="text-primary-300"
            className="
      w-[300px] lg:h-[400px] h-[700px] lg:w-[550px]"
            cardsEffect={{
              perSlideOffset: 10,
              slideShadows: false,
            }}
          >
            {items.map((comment, index) => (
              <SwiperSlide key={index}>
                <div className="h-[600px] p-4 lg:h-[300px]">
                  <Paper className="flex h-[600px] flex-col justify-center shadow-[0_0_1px_2px_#ababab1f] lg:h-[300px]">
                    <div className="flex flex-1 items-center justify-center">
                      <p className="leading-5 text-hgray-600 dark:text-text-dark-3">
                        {comment.text}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <img
                        width={50}
                        height={50}
                        alt=""
                        className="h-[50px] w-[50px] overflow-hidden rounded-full object-cover"
                        src={"/default-profile.png"}
                      />
                      <div className="pr-3">
                        <p className="font-medium text-hgray-600 dark:text-text-dark-3">
                          {"کاربر مهدیارشو"}
                        </p>
                      </div>
                    </div>
                  </Paper>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex items-center justify-end gap-[10%]">
          <button className="text-primary-300" ref={prevRef}>
            <IconArrowRightShort width={36} height={36} />
          </button>
          <button className="text-primary-300" ref={nextRef}>
            <IconArrowLeftShort width={36} height={36} />
          </button>
        </div>
      </div>
    </div>
  );
}
