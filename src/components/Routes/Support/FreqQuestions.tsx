import NextLink from '@/components/Assets/NextLink';
import IconChevronLeft from '@/components/Icons/IconChevronLeft';
import { TicketDepartmanList } from '@/types/';

type Props = {
  departemans: TicketDepartmanList[];
};
export default function FreqQuestions({ departemans }: Props) {
  return (
    <div>
      <h3 className="mb-4 text-2xl font-semibold text-hgray-600 dark:text-white">سوالات پرتکرار</h3>
      <div className="flex flex-wrap justify-between gap-5">
        {departemans.map((item) => (
          <NextLink
            key={item.id}
            href={{
              query: {
                departeman: item.id
              }
            }}
            className="group flex flex-auto items-center justify-between rounded-lg bg-hgray-200 p-3 text-lg text-hgray-600 transition-colors hover:bg-primary-300 hover:text-white dark:bg-mdark-600 dark:text-white lg:w-[40%]"
          >
            <span>{`سوالات متداول: ${item.name}`}</span>

            <IconChevronLeft
              width={28}
              height={28}
              className="text-primary-300 transition-colors group-hover:text-white"
            />
          </NextLink>
        ))}
      </div>
    </div>
  );
}
