"use client";
import React from "react";
import { ActiveTab } from "./BookMarkTabs";
import ProductCard from "@/components/ProductCard";
import CourseCard from "@/components/CourseCard";
import BlogCart from "@/components/BlogCard";
import PodcastCard from "@/components/PodcastCard";
import ClassCard from "@/components/ClassCard";
import SedaVaSimaCard from "@/components/SedaVaSimaCard";
import EmptyButton from "@/components/Assets/EmptyButton";
import ToggleBookmarkBtn from "@/components/Assets/ToggleBookmarkBtn";
import { Model } from "@/types";

const carts = {
  products: ProductCard,
  courses: CourseCard,
  articles: BlogCart,
  podcast: PodcastCard,
  media: SedaVaSimaCard,
  tv: SedaVaSimaCard,
  lessons: ClassCard,
};

const activeTabToModel: { [key: string]: Model } = {
  products: "product",
  courses: "course",
  articles: "article",
};
type Props = {
  cartType: ActiveTab;
  item: any;
};
export default function BookMarkCart(props: Props) {
  const { cartType, item } = props;

  const CartComponent = carts[cartType];
  return (
    <div className="relative">
      <CartComponent {...item} />

      <div className="absolute bottom-2 left-2 rounded-xl p-1 w-10 h-10 flex items-center justify-center">
      <ToggleBookmarkBtn
        bookmark
        id={item.id}
        model={activeTabToModel[cartType] ?? "lesson"}
      />

      </div>
    </div>
  );
}
