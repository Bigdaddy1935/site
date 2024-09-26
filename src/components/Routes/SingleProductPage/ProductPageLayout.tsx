"use client";
import React, { useEffect } from "react";
import ProductAddToCart from "./ProductAddToCart";
import CourseHeader from "../SingleCoursePage/CourseHeader";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import Hidden from "@/components/Assets/Hidden";
import LessonsList from "../SingleCoursePage/LessonsList";
import Comments from "@/components/Comments";
import { getProductComments } from "@/lib/comments/getComments";
import Image from "@/components/Assets/Image";
import CourseDetails from "../SingleCoursePage/CourseDetails";
import { useGetProductDataQuery } from "@/lib/services/base";
import VideoPlayer from "@/components/Assets/VideoPlayer";
import { isExists } from "@/lib/utils";
import { Model } from "@/types";
import IconLoading from "@/components/Icons/IconLoading";
import { useAppSelector } from "@/lib/reduxHooks";
import { selectUser } from "@/lib/reduxFeatures/authSlice";

type Props = {
  productId: number;
};

export default function ProductPageLayout({ productId }: Props) {
  const user = useAppSelector(selectUser);
  const { data, isLoading, isError } = useGetProductDataQuery(
    { productId },
    { skip: !productId, refetchOnMountOrArgChange: true }
  );

  const product = data?.product;

  return (
    <React.Fragment>
      {isLoading ? (
        <div className="min-h-[70vh] bg-hgray-400/20 w-full flex items-center justify-center">
          <IconLoading width={36} height={35} />
        </div>
      ) : product && !isError ? (
        <>
          <Hidden hidden="lg">
            <HeaderSetTitle
              label={product.courses.course_title}
              needAnimation={true}
            />
          </Hidden>
          <div className="lg:w-[50%] lg:flex-1">
            <CourseHeader
              title={product.courses?.course_title}
              description={product.courses?.description}
              categories={product?.categories}
              type="product"
            />

            <ProductAddToCart
              price={product?.price}
              price_discount={product?.price_discount}
              product_id={product?.id}
              invoices_exists={product?.invoices_exists || product.paid}
            />

            <LessonsList
              courseId={product?.courses.id}
              invoices_exists={product?.paid}
              type={product?.courses?.type as Model}
            />

            <Comments
              model="product"
              id={Number(productId)}
              type="App\Models\Product"
            />
          </div>
          <div className="top-[100px] lg:sticky lg:w-[50%] lg:flex-1 lg:self-start lg:p-6">
            {isExists(product.courses?.intro) ? (
              <VideoPlayer
                poster={product.courses?.picture}
                src={product.courses?.intro!}
              />
            ) : (
              <div className="relative">
                <Image
                  className="rounded-md"
                  style={{ width: "100%", height: "auto" }}
                  width={600}
                  height={399}
                  src={product.courses.picture}
                  alt={product?.courses?.course_title}
                />
              </div>
            )}

            <CourseDetails
              {...product?.courses}
              like={product?.like}
              like_count={product.like_count}
              bookmark={product?.bookmark}
              product_id={product?.id}
              categories={product?.categories}
            />
          </div>
        </>
      ) : (
        <p>دریافت اطلاعات با مشکل مواجه شد.</p>
      )}
    </React.Fragment>
  );
}
