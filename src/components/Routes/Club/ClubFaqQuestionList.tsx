"use client";

import ContentBox from "@/components/Assets/ContentBox";
import EmptyButton from "@/components/Assets/EmptyButton";
import Paper from "@/components/Assets/Paper";
import VideoPlayer from "@/components/Assets/VideoPlayer";
import Divider from "@/components/Divider";
import IconDownOpen from "@/components/Icons/IconDownOpen";
import IconPatchQuestion from "@/components/Icons/IconPatchQuestion";
import { useState } from "react";

type QuestionItem = {
  id: number;
  title: string;
  link: string;
  subtitle: string;
};

type ActiveTab = "academy" | "poyan" | null;
export default function ClubFaqQuestionList() {
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);
  const [question, setQuestion] = useState<QuestionItem>(listsVideoAcademy[0]);
  return (
    <div className="flex  flex-col-reverse lg:flex-row gap-4 justify-end lg:justify-between">
      <div
        className={`flex bg-white  dark:bg-mdark-600 lg:max-w-[400px] flex-col gap-6 p-3 rounded-[1.125rem]`}
      >
        <TabItem
          items={listsVideoAcademy}
          label="سوالات آکادمی"
          onClick={() =>
            setActiveTab(activeTab === "academy" ? null : "academy")
          }
          open={activeTab === "academy"}
          question={question}
          setQuestion={setQuestion}
        />
        <TabItem
          items={listVideoPoian}
          label="سوالات پویان"
          onClick={() => setActiveTab(activeTab === "poyan" ? null : "poyan")}
          open={activeTab === "poyan"}
          question={question}
          setQuestion={setQuestion}
        />
      </div>

      <div className="lg:flex-1">
        {question && (
          <Paper className="rounded-[1.125rem]">
            <VideoPlayer src={question.link} poster={""} />
            <p className="text-hgray-500 dark:text-text-dark-2 font-semibold mt-8">
              {question.title}
            </p>
            <p className="text-text-dark-2">{question.subtitle}</p>
          </Paper>
        )}
      </div>
    </div>
  );
}

type TabItemProps = {
  label: string;
  items: QuestionItem[];
  open: boolean;
  onClick: () => void;
  question: QuestionItem;
  setQuestion: (s: QuestionItem) => void;
};
function TabItem(props: TabItemProps) {
  const { label, items, onClick, open, setQuestion, question } = props;
  return (
    <div className="group  cursor-pointer rounded-md bg-hgray-200 p-3  dark:bg-mdark-600">
      <div
        onClick={onClick}
        className="flex items-center justify-between  text-lg text-hgray-600 dark:text-white"
      >
        <IconPatchQuestion width={22} height={22} />
        <span className="flex-1 pr-2">{label}</span>

        <EmptyButton>
          <IconDownOpen
            width={28}
            height={28}
            className={`text-primary-300 ${open ? "rotate-180" : ""}`}
          />
        </EmptyButton>
      </div>
      <ContentBox open={open}>
        <Divider space="my-3" />

        <div className="px-1 pb-3 lg:max-h-[70vh] overflow-y-scroll custom-scrollbar pe-2  text-[15px] leading-10 text-hgray-500 dark:text-white">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex border-b border-hgray-300 dark:border-mdark-500 py-2 items-center gap-4"
              onClick={() => {
                setQuestion(item);
                setTimeout(() => window.scrollTo(0, 0), 200);
              }}
            >
              {question.link === item.link ? (
                <div className="w-6 min-w-6 h-6 rounded-full border-2 bg-primary-400"></div>
              ) : (
                <div className="w-6 min-w-6 h-6   rounded-full border-2 border-primary-400"></div>
              )}
              <div>
                <div>
                  <p className="leading-normal dark:text-text-dark-5 text-sm mb-1 font-semibold">
                    {item.title}
                  </p>
                  <p className="text-sm dark:text-text-dark-2">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ContentBox>
    </div>
  );
}

const listsVideoAcademy = [
  {
    id: 1,
    title: "معرفی کامل دوره مهدیار شو",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/present.mp4",
    subtitle: "سوال اول",
  },
  {
    id: 2,
    title: "توضیح ریز موضوعات دوره",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/14.mp4",
    subtitle: "سوال دوم",
  },
  {
    id: 3,
    title: "هدف از ثبت نام در مهدیارشو چیه چرا باید ثبت نام کنم؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/1.m4v",
    subtitle: "سوال سوم",
  },
  {
    id: 4,
    title: "مهدیارشو برای چه سنی مناسبه؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/2.m4v",
    subtitle: "سوال چهارم",
  },
  {
    id: 5,
    title: "تفاوت دوره طلایی، نقره ای و برنزی",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/3.mp4",
    subtitle: "سوال پنجم",
  },
  {
    id: 6,
    title: "وظایف پشتیبان ها در طول دوره چی هست؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/19.m4v",
    subtitle: "سوال ششم",
  },
  {
    id: 7,
    title: "نقش والدین در این دوره به چه شکل است؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/18.m4v",
    subtitle: "سوال هفتم",
  },
  {
    id: 8,
    title: "من از دوره عقب بیوفتم باید چه کنم",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/17.m4v",
    subtitle: "سوال هشتم",
  },
  {
    id: 9,
    title: "ارتباط شما با ما به چه شکل است",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/6.m4v",
    subtitle: "سوال نهم",
  },
  {
    id: 10,
    title: "برای چی پول میگیرید؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/7.mp4",
    subtitle: "سوال دهم",
  },
  {
    id: 11,
    title: "گارانتی دوره به چه شرطی است؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/8.mp4",
    subtitle: "سوال یازدهم",
  },
  {
    id: 12,
    title: "ایا در دوره آزمون هم داریم؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/20.m4v",
    subtitle: "سوال دوازدهم",
  },
  {
    id: 13,
    title: "چطور میشه از فایل ها استفاده کرد؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/9.mp4",
    subtitle: "سوال سیزدهم",
  },
  {
    id: 14,
    title: "چطور فرزندم رو راضی کنم از دوره استفاده کند؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/10.m4v",
    subtitle: "سوال چهاردهم",
  },
  {
    id: 15,
    title: "میتونم دوره رو با خواهر یا برادرم ببینم؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/11.m4v",
    subtitle: "سوال پانزدهم",
  },
  {
    id: 16,
    title: "میتونم این دوره رو به کسی بدم؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/12.m4v",
    subtitle: "سوال شانزدهم",
  },
  {
    id: 17,
    title: "روزانه چقدر باید برای دوره وقت گذاشت",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/16.mp4",
    subtitle: "سوال هفدهم",
  },
  {
    id: 18,
    title: "از خارج کشور چطور میشه ثبت نام کرد؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar/15.mp4",
    subtitle: "سوال آخر",
  },
];

const listVideoPoian = [
  {
    id: 1,
    title: "معرفی کامل",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/Present.mp4",
    subtitle: "سوال اول",
  },
  {
    id: 2,
    title: "روند دوره استعدادیابی به چه شکل است؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/1.mp4",
    subtitle: "سوال دوم",
  },
  {
    id: 3,
    title: "تیم پویان در چه دسته ای استعدادیابی میکند؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/10.m4v",
    subtitle: "سوال سوم",
  },
  {
    id: 4,
    title:
      "در بعضی سایتها روند استعدادیابی به صورت رایگان انجام میشه، اینجا چه فرقی داره؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/12.m4v",
    subtitle: "سوال چهارم",
  },
  {
    id: 5,
    title: "محدوده سنی برای ثبت نام چقدر است؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/2.mp4",
    subtitle: "سوال پنجم",
  },
  {
    id: 6,
    title: "ایا این دوره برای من که دانشجو هستم هم مفیده؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/7.mp4",
    subtitle: "سوال ششم",
  },
  {
    id: 7,
    title: "روزانه باید چقدر وقت گذاشت؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/11.m4v",
    subtitle: "سوال هفتم",
  },
  {
    id: 8,
    title: "گارانتی دوره استعدادیابی به چه شکل است؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/9.m4v",
    subtitle: "سوال هشتم",
  },
  {
    id: 9,
    title: "آیا میتونم استعدادیابی رو در اختیار شخص دیگه ای بزارم؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/3.mp4",
    subtitle: "سوال نهم",
  },
  {
    id: 10,
    title: "نحوه پشتیبانی استعدادیابی به چه شکل است؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/8.m4v",
    subtitle: "سوال دهم",
  },
  {
    id: 11,
    title: "آیا در این دوره مشاوره هم دارید؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/4.mp4",
    subtitle: "سوال یازدهم",
  },
  {
    id: 12,
    title: "آزمون ها در این دوره به چه شکل است؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/5.mp4",
    subtitle: "سوال دوازدهم",
  },
  {
    id: 13,
    title: "اگه نخوایم با والدینمون ارتباط بگیرید، میشه؟",
    link: "https://dl.poshtybanman.ir/Club/MahdyarSho/Term1/SoalatPorTekrar-S/6.mp4",
    subtitle: "سوال آخر",
  },
];
