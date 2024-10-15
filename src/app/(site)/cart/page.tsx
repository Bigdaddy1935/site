import Container from '@/components/Assets/Container';
import Hidden from '@/components/Assets/Hidden';
import HeaderSetTitle from '@/components/Layout/HeaderSetTitle';
import CartItemsList from '@/components/Routes/Cart/CartItemsList';
import CartPayment from '@/components/Routes/Cart/CartPayment';

export const metadata = {
  title: 'سبد خرید',
  openGraph: {
    type: 'website'
  }
};
export default function CartPage() {
  return (
    <Container className="my-4 max-w-screen-xl lg:my-24">
      <Hidden hidden="lg">
        <HeaderSetTitle label={'سبد خرید'} />
      </Hidden>
      <div className="mb-9">
        <h2 className="text-2xl font-bold text-hgray-600 dark:text-white lg:text-4xl">سبد خرید</h2>
      </div>

      <div className="flex flex-col gap-[10%] lg:flex-row">
        <CartItemsList />

        <div className="w-full max-lg:mt-6 lg:max-w-[325px]">
          <CartPayment />
        </div>
      </div>
    </Container>
  );
}
