import IconChevronLeft from '@/components/Icons/IconChevronLeft';
import NextLink from './NextLink';

export type SectionTitleProps = {
  title: string;
  subTitle: string;
  moreHref?: string;
  moreText?: string;
};
export default function SectionTitle(props: SectionTitleProps) {
  const { title, subTitle, moreHref, moreText } = props;
  return (
    <div className="mb-7 flex flex-col lg:flex-row lg:items-center justify-between">
      <div className="relative flex items-center">
        <span className="relative inline-block h-[18px] w-[18px] rounded-md border border-primary-300">
          <span className="absolute bottom-[40%]  right-[40%] inline-block h-[18px] w-[18px] rounded-full bg-primary-300/30"></span>
        </span>

        <div className='pr-3 lg:pr-6'>
          <h2 className="text-xl lg:text-3xl font-extrabold text-primary-700 dark:text-white">{title}</h2>
          <p className="text-sm lg:text-base text-hgray-600 dark:text-hgray-300">{subTitle}</p>
        </div>
      </div>

      {moreHref ? (
        <NextLink
          className="flex items-center justify-end lg:justify-start text-primary-700 dark:text-hgray-300"
          href={moreHref}
        >
          {moreText || 'مشاهده بیشتر'} <IconChevronLeft width={24} height={24} />{' '}
        </NextLink>
      ) : null}
    </div>
  );
}
