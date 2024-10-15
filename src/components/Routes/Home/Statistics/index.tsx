import Paper from "@/components/Assets/Paper";
import { KeyValue, SiteStatistics } from "@/types/";
import Counter from "./Counter";

const items = [
  {
    label: "تعداد درس",
    key: "lessons_count",
    image: "",
  },
  {
    label: "تعداد دوره",
    key: "course_count",
    image: "",
  },
  {
    label: "ثبت نامی ها",
    key: "course_users_count",
    image: "",
  },
  {
    label: "مهدیاری شوها",
    key: "mahdyar_club_count",
    image: "",
    target: 8652,
  },
];
export type StatisticsProps = SiteStatistics & KeyValue;

export default function Statistics(statistics: StatisticsProps) {
  return (
    <section className="">
      <div className="flex flex-wrap justify-between gap-y-4 lg:justify-evenly">
        {items.map((item) => (
          <Paper
            key={item.key}
            className="mx-2 lg:py-8 lg:px-6 flex min-w-[90%] sm:min-w-[40%] flex-1 items-center lg:mx-6 lg:min-w-[unset]"
          >
            <Counter targetNumber={item.target ?? statistics[item.key] ?? 0} />
            <p className="pr-8  text-xl font-bold text-hgray-600 dark:text-text-dark-2">
              {item?.label}
            </p>
          </Paper>
        ))}
      </div>
    </section>
  );
}
