import NextLink from "@/components/Assets/NextLink";
import { Category } from "@/types/";

type Props = {
  categories: Category[];
};

const categoryOrder = [4, 3, 1, 2];

export default function SiteAds({ categories }: Props) {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl lg:text-3xl leading-relaxed text-hgray-600 dark:text-text-dark-1 font-semibold max-lg:text-center">
        نگاهی جامع به ابعاد موضوعات اسلامی در آکادمی روح بخش
      </h2>

      <p className="text-sm py-10 text-hgray-400 leading-8 text-center lg:text-justify dark:text-white">
        تلاش ما در آکادمی روح بخش این است که محتوا و مفاهیم اسلامی را از جهت های
        مختلف بررسی کرده (توسعه فردی، اعتقادات، روانشناسی و احکام شرعی) و با
        متخصصین هر موضوع محتواهای متعددی بسازیم، در قالب ویدئو، متن و از همه مهم
        تر تولید دوره های آموزشی که به مخاطب در راستای درک کامل یک موضوع به صورت
        درس به درس کمک بسزایی میکند.
      </p>

      <div className="flex flex-wrap gap-4">
        {categoryOrder.map((catId) => {
          const category = categories.find((i) => i.id === catId);

          return category ? (
            <NextLink
              key={catId}
              style={{ color: category.color, borderColor: category.color }}
              className="px-3 py-2 flex-1 min-w-[45%] font-medium lg:min-w-[200px] text-center rounded-md border-2 border-solid"
              href={`/${category.slug}-${category.id}`}
            >
              {category.name}
            </NextLink>
          ) : null;
        })}
      </div>
    </div>
  );
}
