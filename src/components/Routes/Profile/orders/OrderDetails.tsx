"use client";
import EmptyButton from "@/components/Assets/EmptyButton";
import Image from "@/components/Assets/Image";
import Paper from "@/components/Assets/Paper";
import IconArrowLeftShort from "@/components/Icons/IconArrowLeftShort";
import formatFullName from "@/lib/formatFullName";
import { toLocalString } from "@/lib/number";
import { toPersianDateTimeFormat } from "@/lib/toPersianDateFormat";
import { Order } from "@/types/";
import { useOrderList } from "./OrderListProvider";
import useNextRouter from "@/hooks/useNextRouter";

export default function OrderDetails(props: Order) {
  const { setShowDetails } = useOrderList();
  const router = useNextRouter();
  const items = [
    {
      title: "شماره فاکتور",
      value: props.id,
    },
    {
      title: (
        <EmptyButton
          onClick={() => setShowDetails(null)}
          className="flex text-base items-center text-blue-600 justify-end w-[200px]"
        >
          <span>بازگشت</span>

          <IconArrowLeftShort width={24} height={24} />
        </EmptyButton>
      ),
      value: "button",
    },
    {
      title: "مبلغ پرداخت شده",
      value: (
        <>
          {toLocalString(props.amount)}{" "}
          <span className="text-sm font-normal text-hgray-400 mr-0.5">
            تومان
          </span>
        </>
      ),
    },
    {
      title: "نوع پرداخت",
      value: props.card_pan,
    },
    {
      title: "شماره پیگیری",
      value: props.ref_id,
    },
    {
      title: "تاریخ سفارش",
      value: (
        <span className="ltr inline-block">
          {toPersianDateTimeFormat(props.created_at)}
        </span>
      ),
    },
  ];
  return (
    <div className="my-4">
      <Paper>
        <div className="flex justify-between items-center flex-wrap">
          {items.map((i, index) => (
            <div className={`w-full lg:w-[50%] sm:w-auto mt-5`} key={index}>
              {i.value === "button" ? (
                <div className="flex justify-end">{i.title}</div>
              ) : (
                <>
                  <p className="text-sm text-hgray-400 dark:text-hgray-200">
                    {i.title}:
                  </p>
                  <p className="text-sm font-medium text-hgray-600 dark:text-hgray-200 mr-1">
                    {i.value}
                  </p>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-between">
          {props.products.map((product) => (
            <div
              key={product.id}
              onClick={() => router.push(`/product/product-${product.id}`)}
              className="w-full cursor-pointer lg:w-[50%] p-1"
            >
              <div
                key={product.id}
                className="flex items-center flex-1 border border-solid border-hgray-300 dark:border-mdark-500 rounded-lg p-1"
              >
                <Image
                  src={
                    product.courses.picture ?? "temp-images /course-card.jpg"
                  }
                  width={130}
                  height={100}
                  className="object-contain rounded-lg"
                  alt=""
                />

                <div className="mr-2">
                  <p className="text-hgray-500 dark:text-hgray-200">
                    {product?.courses?.course_title}
                  </p>
                  <p className="text-sm text-hgray-500 dark:text-hgray-200">
                    نام استاد: {formatFullName(product.courses.course_teacher)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Paper>
    </div>
  );
}
