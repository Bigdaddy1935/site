"use client";
import Button from "@/components/Assets/Button";
import IconLoading from "@/components/Icons/IconLoading";
import useAddToCart from "@/hooks/cart/useAddToCart";
import useCheckProductInCart from "@/hooks/cart/useCheckProductInCart";
import useHandleLogin from "@/hooks/useHandleLogin";
import useNextRouter from "@/hooks/useNextRouter";
import { toLocalString } from "@/lib/number";
import { selectUser } from "@/lib/reduxFeatures/authSlice";
import { useAppSelector } from "@/lib/reduxHooks";

type Props = {
  price: number;
  product_id: number;
  price_discount?: number | null;
  invoices_exists?: boolean;
};
export default function ProductAddToCart(props: Props) {
  const { price, price_discount, product_id, invoices_exists } = props;
  const user = useAppSelector(selectUser);
  const { addToCart, isLoading } = useAddToCart();
  const { handleLogin } = useHandleLogin();
  const router = useNextRouter();
  const productCartId = useCheckProductInCart(product_id);
  const handleAddToCart = () => {
    if (!user) return handleLogin();

    if (!productCartId) addToCart(product_id);
    else router.push("/cart");
  };

  return (
    <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row">
      {invoices_exists ? (
        <Button
          disabled
          size="large"
          color="primary"
          className={`flex w-full max-w-sm items-center justify-center`}
        >
          <span>این محصول خریداری شده است</span>
        </Button>
      ) : (
        <Button
          disabled={isLoading}
          onClick={handleAddToCart}
          outlined={!productCartId}
          size="large"
          color="primary"
          className={`flex w-full max-w-sm items-center justify-center py-4`}
        >
          {productCartId ? (
            "نهایی سازی خرید و شروع یادگیری"
          ) : isLoading ? (
            <IconLoading
              width={22}
              height={22}
              className="mx-auto inline-block"
            />
          ) : (
            <>
              {user ? (
                <span>خرید و شروع دوره</span>
              ) : (
                <span>جهت خرید دوره وارد شوید</span>
              )}
            </>
          )}
        </Button>
      )}

      {invoices_exists ? null : (
        <div className="flex items-center justify-end">
          {price_discount ? (
            <p className="ml-3 inline-block text-lg font-medium text-hgray-400 line-through dark:text-text-dark-4">
              {toLocalString(price)} تومان
            </p>
          ) : null}
          <p>
            <span className="text-2xl font-semibold text-primary-300 dark:text-text-dark-2">
              {toLocalString(price_discount || price)}{" "}
            </span>{" "}
            <span className="dark:text-text-dark-4">تومان</span>
          </p>
        </div>
      )}
    </div>
  );
}
