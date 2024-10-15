import { ClubPlanItem, PlanType } from "../types";

const clubItems: ClubPlanItem[] = [
  {
    label: "نقره ای",
    price: 1500000,
    type: PlanType.VIP,
    channel: "https://eitaa.com/joinchat/3187934133C6a44247377",
    discount: 10,
    image: "/silver.webp",
    spic_label: "محبوب ترین",
    facilities: [
      {
        label: "دسترسی کامل به محتوا",
        status: 1,
      },
      {
        label: "همراه پشتیبانی دائمی",
        status: 1,
      },
      {
        label: "دریافت بسته کمک آموزشی",
        status: 1,
      },
      {
        label: "شرکت در آزمون(شرط ورود ترم2)",
        status: 1,
      },
      {
        label: "شرکت در چالش ها",
        status: 1,
      }, 
      {
        label: "استعدادیابی تحصیلی و شغلی",
        status: 0,
      },
    ],
  },
  {
    label: "طلایی",
    type: PlanType.GOLD,
    price: 2800000,
    image: "/gold.webp",

    spic_label: "موثرترین",
    channel: "https://eitaa.com/joinchat/3164210101Cb00eccb196",
    discount: 10,
    facilities: [
      {
        label: "دسترسی کامل به محتوا",
        status: 1,
      },
      {
        label: "همراه پشتیبانی دائمی",
        status: 1,
      },
      {
        label: "استعدادیابی تحصیلی و شغلی",
        status: 1,
      },
      {
        label: "دریافت بسته کمک آموزشی",
        status: 1,
      },
      {
        label: "شرکت در آزمون(شرط ورود ترم2)",
        status: 1,
      },
      {
        label: "شرکت در چالش ها",
        status: 1,
      },
    ],
  },
  {
    label: "برنزی",
    type: PlanType.NORMAL,
    image: "/bronze.webp",
    spic_label: "ویژه معلمین و فرهنگیان",
    price: 800000,
    discount: 10,
    channel: "https://eitaa.com/joinchat/283312402C5c93617fd0",
    facilities: [
      {
        label: "دسترسی کامل به محتوا",
        status: 1,
      },
      {
        label: "شرکت در آزمون(شرط ورود ترم2)",
        status: 1,
      },
      {
        label: "شرکت در چالش ها",
        status: 0,
      },
      {
        label: "همراه پشتیبانی دائمی",
        status: 0,
      },
      {
        label: "استعدادیابی تحصیلی و شغلی",
        status: 0,
      },
      {
        label: "دریافت بسته کمک آموزشی",
        status: 0,
      },
    ],
  },
];

export default clubItems;
