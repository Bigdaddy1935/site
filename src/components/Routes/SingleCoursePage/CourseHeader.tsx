import { isExists } from "@/lib/utils";
import Link from "next/link";
import { Category, Model } from "@/types/";

type Props = {
  categories: Category[];
  title: string;
  description: string | null;
  type: Model;
};
const CourseHeader = (props: Props) => {
  const { categories, title, description, type } = props;
  const category = categories[0];
  return (
    <div>
      <div className="flex items-center max-lg:mt-8">
        <Link
          className="ml-3 h-8 w-[0] overflow-hidden rounded-xl px-2 text-center leading-8 text-transparent transition-all hover:w-[120px] hover:text-white"
          style={{
            backgroundColor: category?.color,
          }}
          href={`/${type}s/${category?.slug}-${category?.id}`}
        >
          {categories[0]?.name}
        </Link>
        <h1 className="ml-4 text-xl font-semibold text-primary-900 dark:text-text-dark-1">
          {title}
        </h1>
      </div>

      <div>
        {description && isExists(description) && (
          <div
            className="mt-3 text-justify text-base font-medium leading-7 text-hgray-600 dark:text-text-dark-1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </div>
    </div>
  );
};

export default CourseHeader;
