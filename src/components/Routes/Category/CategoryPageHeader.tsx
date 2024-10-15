import Container from "@/components/Assets/Container";
import EmptyButton from "@/components/Assets/EmptyButton";
import Hidden from "@/components/Assets/Hidden";
import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import Divider from "@/components/Divider";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import React from "react";
import { Category, KeyValue } from "@/types/";
import ScrollButton from "./ScrollButton";

const allSections: KeyValue = {
  products: "محصولات",
  courses: "دوره ها",
  articles: "مقالات",
  podcasts: "پادکست ها",
};
type Props = {
  categories: Category[];
  categoryId: number;
  sections: {
    products: boolean;
    courses: boolean;
    articles: boolean;
    podcasts: boolean;
  } & KeyValue;
};

export default function CategoryPageHeader({
  categories,
  categoryId,
  sections,
}: Props) {
  const category = categories.find((i) => i.id === categoryId);

  return (
    <Container>
      <HeaderSetTitle label={category?.name ?? ""} />
      <div className="mt-4 flex justify-between lg:justify-start lg:gap-5">
        {categories
          .filter((i) => i.id !== 17)
          .map((cat) => (
            <React.Fragment>
              {category?.id === cat.id ? (
                <EmptyButton
                  style={{ color: cat.color, borderColor: cat.color }}
                  className="rounded-lg border border-solid p-2 text-sm"
                >
                  {cat.name}
                </EmptyButton>
              ) : (
                <NextLink
                  className="p-2 text-sm text-hgray-600 dark:text-text-dark-1"
                  key={cat.slug}
                  href={`/${cat.slug}-${cat.id}`}
                >
                  {cat.name}
                </NextLink>
              )}
            </React.Fragment>
          ))}
      </div>
      <div
        className="mt-4 flex items-center justify-between gap-4
     rounded-lg bg-hgray-200 p-2 dark:bg-mdark-600"
      >
        <Image
          src={category?.picture ?? "/temp-images/course-card.jpg"}
          height={65}
          width={65}
          className="rounded-lg"
          alt={category?.name ?? ""}
        />

        <Divider orientation="vertical" className="h-14 dark:bg-mdark-500" />
        <div className="flex-1 rounded-lg">
          {Object.keys(allSections).map((key) => (
            <React.Fragment key={key}>
              {sections[key] ? (
                <ScrollButton
                  sectionId={`${category?.slug}-${key}`}
                  color={"#eee"}
                  label={allSections[key]}
                />
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Container>
  );
}
