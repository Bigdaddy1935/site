import ContainerLayout from '@/components/Assets/ContainerLayout';
import Hidden from '@/components/Assets/Hidden';
import HeaderSetTitle from '@/components/Layout/HeaderSetTitle';
import AllQuestions from '@/components/Routes/Support/AllQuestions';
import SendMessage from '@/components/Routes/Support/SendMessage';
import { Query } from '@/lib/axios';
import { abort } from 'process';
import { DepartmanQuestion, TicketDepartmanList } from '@/types';
import { PaginateData } from '@/types/response';

type Props = {
  searchParams: {
    departeman: string;
  };
};

export const metadata = {
  title: `سوالات متداول | آکادمی روحبخش`
};
export default async function SupportPage({ searchParams: { departeman } }: Props) {
  const questionsQuery = departeman
    ? Query<{ department: TicketDepartmanList }>(`/department/get/${departeman}`)
    : Query<PaginateData<DepartmanQuestion>>('/departments/questions/get');
  const [questions, departemans] = await Promise.all([
    questionsQuery,
    Query<TicketDepartmanList[]>('/department/get')
  ]);

  if (typeof questions === 'boolean' || typeof departemans === 'boolean') abort();

  return (
    <ContainerLayout className="my-24">
      <div className="mb-24">
        <Hidden hidden="lg">
          <HeaderSetTitle label={'پشتیبانی + سوالات متداول'} />
        </Hidden>
        <h2 className="text-2xl font-bold text-hgray-600 dark:text-white lg:text-4xl">
          چطور میتونیم کمک کنیم؟
        </h2>
        <p className="mt-3 text-base text-hgray-600 dark:text-white">
          برای سریع تر رسیدن به جواب سوال خود، قبلا از ارتباط با کارشناسان سوالات پر تکرار را مرور
          کنید
        </p>
      </div>

      {/* <FreqQuestions departemans={departemans} /> */}

      {departeman ? (
        <AllQuestions
          data={(questions as { department: TicketDepartmanList })?.department?.questions}
        />
      ) : (
        <AllQuestions {...(questions as PaginateData<DepartmanQuestion>)} />
      )}

      <SendMessage />
    </ContainerLayout>
  );
}
