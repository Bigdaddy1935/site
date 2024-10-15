"use client"
import ContentBox from "@/components/Assets/ContentBox";
import EmptyButton from "@/components/Assets/EmptyButton";
import Divider from "@/components/Divider";
import IconChevronLeft from "@/components/Icons/IconChevronLeft";
import IconDownOpen from "@/components/Icons/IconDownOpen";
import IconPatchQuestion from "@/components/Icons/IconPatchQuestion";
import Link from "next/link";
import { useState } from "react";

const questions = [
  {
    title: "چه تفاوتی بین طلایی و نقره ای و برنزی وجود داره؟",
    content: `برنزی: در این بسته شما فقط محتوارو دریافت میکنید و چون این بسته برای معلمین و فعالان فرهنگی  مهیا شده، طبیعی است که نیازی به پشتیبان و حتی ارسال بسته ی فرهنگی هم نداشته باشند
    <br />
  نقره ای: در کنار محتوا شما میتونید در لایوهای پرسش و پاسخ با اساتید هم شرکت کنید. در این بسته شما پشتیبان هم دارید که روند دوره بهتون کمک میکند
  و حتی بسته ی کمک آموزشی هم برای شما ارسال میشه
    <br />
  طلایی: تمامی موارد بالا به علاوه استعدادیابی
  این بسته از همه بیشتر برای نوجوانان مفید است، چرا که کنار محتوای مهدیارشو میتونن از استعداد خودشون هم به خوبی با خبر شوند`,
  },
  {
    title: "این مدرسه برای چه سنی مناسب است؟",
    content: `مهدیارشو چند خدمت را ارائه میکند
    <br />
    1. محتوا
    <br />
  2. پشتیبانی 
  <br />
  3. استعدادیابی
  در سنین مختلف 
  
  <br />
  اگر شما معلم یا فعال فرهنگی هستید یا حتی والدینی هستید که میخواید خودتون برای تربیت فرزندتون اقدام کنید این محتوا خیلی کمکتون میکنه ولی طبیعیه که در این صورت دیگه نیازی به پشتیبانی یا استعدادیابی خودتون ندارید
  <br />
یا اگر تا 25 سال سن دارید میتونید از این محتوا در کنار پشتیبانی استفاده کنید 
اعتقادات یا حتی مهارت های توسعه فردی که گفته میشه حتی در سنین بالاتر هم مورد استفاده است
<br />
اما استعدادیابی: طبیعی است که این مورد بیشتر برای سنین نوجوانی مفید است
  `,
  },
  {
    title: "این مدرسه چقدر از من زمان می گیرد؟",
    content: `
    در این مدرسه 90 روز در کنار شما هستیم 
    <br />
هر روز براتون محتوا و آموزش داریم 
<br />
اما اصلا نگران نباشید، چون مدت زمانی که نیاز است در روز بگذارید بین 20 الی 45 دقیقه است
<br />
تازه این محتوا اول صبح تقدیمتون میشه و شما میتونید در طول روز برنامه ریزی کنید و ببینید
    `,
  },
  {
    title: "وظیفه پشتیبان ها چی هست؟",
    content: `
    پشتیبان وظیفه داره در طول دوره بین 4 الی 7 بار با شما تماس بگیرد و برنامه شمارو پیگیری کند
    <br />
    + اینکه پاسخگوی سوالات شما در مورد مسائل فنی و محتوایی است، هر سوالی درمورد محتوای مدرسه دارید میتونید بپرسید و نهایت تا 24 ساعت پاسخش رو دریافت کنید
    <br />
    + اگر از برنامه عقب بمونید براتون برنامه ریزی مجدد انجام میده که با بقیه همراه بشید
    <br />
    + برگذاری چالش های مختلف و ارسال جوایز میان دوره 
    <br />
    + اطلاع رسانی از لایو ها ازمون و جلسات حضوری احتمالی
    <br />
    + تازه پاسخگویی پشتیبان ها به زمان 90 روز ختم نمیشه و شما هر وقت بخواید میتونید سوالات محتواییتون رو از پشتیبان و اساتید بپرسید، حتی یک سال بعد
    `,
  },
  {
    title: "تو بسته ای که ارسال میکنید چی ها هست؟",
    content: `
    1. تخته شاسی
    <br />
2. خودکار
<br />
3. استند موبایل
<br />
4. دفتر مراقبه مهدیار (دفتر برنامه ریزی)  <br />
5. خلاصه محتوای مدرسه  <br />
<br />
این بسته حکم یک نیروی انگیزه بخش رو در طول دوره برای شما دارد
البته همونطور که قبلا گفتیم این بسته برای طرح برنزی ارسال نمیشه
    `,
  },
];
export default function ClubFaqs() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-y-6">
      {questions.map(({ title, content }, index) => (
        <div
          key={index}
          className="group flex-auto  cursor-pointer rounded-lg bg-hgray-200 p-3  dark:bg-mdark-600"
        >
          <div
            onClick={() => setOpen(open === index ? null : index)}
            className="flex items-center justify-between  text-lg text-hgray-600 dark:text-white"
          >
            <IconPatchQuestion width={22} height={22} />
            <span className="flex-1 pr-2">{title}</span>

            <EmptyButton>
              <IconDownOpen
                width={28}
                height={28}
                className={`text-primary-300 ${open && open === index ? "rotate-180" : ""}`}
              />
            </EmptyButton>
          </div>
          <ContentBox open={open === index}>
            <Divider space="my-3" />

            <div className="px-1 pb-3 text-base leading-10 text-hgray-500 dark:text-white">
              <p dangerouslySetInnerHTML={{ __html: content }}></p>
            </div>
          </ContentBox>
        </div>
      ))}

<div className="flex justify-start">
        <Link className="flex bg-primary-300 rounded-lg items-center text-white p-4 font-medium py-2" href={"/club-faqs"}>
          مشاهده سوالات متداول
          <IconChevronLeft width={22} height={22} />
        </Link>
      </div>
    </div>
  );
}
