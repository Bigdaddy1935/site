import Hidden from "@/components/Assets/Hidden";
import Paper from "@/components/Assets/Paper";
import SectionTitle from "@/components/Assets/SectionTitle";
import IconGraduationCap from "@/components/Icons/IconGraduationCap";
import IconRepeat from "@/components/Icons/IconRepeat";
import IconUserSupprt from "@/components/Icons/IconUserSupprt";
import IconWarranty from "@/components/Icons/IconWarranty";

const items = [
  {
    label: "پاسخگویی",
    text: "میتونی هر سوالی در هر زمینه ای که به ما مربوط میشه رو در سایت بپرسی تا کارشناس مربوطه پاسخ شما رو بده",
    IconComponent: IconUserSupprt,
    color: "#3E8914",
  },
  {
    label: "آموزش",
    text: "بخشی از مطالب در سایت پشتیبان من به صورت دوره ای برای مخاطبان ارائه میشه، تا اثر بخشی بهتری داشته باشه.",
    IconComponent: IconGraduationCap,
    color: "#4A9CBF",
  },
  {
    label: "مباحث مرتبط",
    text: "گاهی سوالی برای شما پیش میاد که دوست دارید پاسخش رو از تمام جوانب بدونید، تلاش ما در این سایت، رسیدن به این هدف است.",
    IconComponent: IconRepeat,
    color: "#D6725C",
  },
  {
    label: "تضمین محصولات",
    text: "این ضمانت همیشگی آکادمی روح بخش است، هر محصولی که ارائه می شود، به شرط چاقو است و اگر کسی از محتوای محصول ناراضی بود میتونه هزینه رو پس بگیره. ",
    IconComponent: IconWarranty,
    color: "#7E62D1",
  },
];

type Props = {};

export default function SiteServices({}: Props) {
  return (
    <div>
      <SectionTitle title="خدمتتون هستیم برای" subTitle="" />

      <div className="flex flex-col flex-wrap justify-between gap-[2%] gap-y-[2vw] lg:flex-row">
        {items.map(({ IconComponent, label, text, color }) => (
          <Paper key={text} className="w-full flex-1 lg:min-w-[49%]">
            <div className="flex justify-between lg:items-center">
              <span
                style={{ backgroundColor: `${color}52` }}
                className="relative ml-4 h-14 w-14 rounded-full bg-primary-100/65 dark:bg-primary-700/40"
              >
                <IconComponent
                  style={{ color }}
                  className={`absolute left-[-20px] top-[-10px] text-primary-300 dark:text-primary-700`}
                  width={44}
                  height={44}
                />
              </span>
              <div className="flex-1 pr-4">
                <h4 className="text-xl font-semibold text-primary-800 dark:text-text-dark-1">
                  {label}
                </h4>
                <Hidden hidden="max-lg">
                  <p className="py-3 text-[16px] font-medium leading-8 text-hgray-400 dark:text-hgray-300">
                    {text}
                  </p>
                </Hidden>
              </div>
            </div>
            <Hidden hidden="lg">
              <p className="py-3 text-[14px] font-medium leading-8 text-hgray-400 dark:text-hgray-300">
                {text}
              </p>
            </Hidden>
          </Paper>
        ))}
      </div>
    </div>
  );
}
