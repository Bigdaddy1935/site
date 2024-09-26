'use client';
import clsx from 'clsx';

import Hidden from '../Assets/Hidden';
import { useFilters } from './FilterContext';
import { ArchivePage } from './types';
import { useGetCategoresQuery } from '@/lib/services/base';
import { useMobilePopup } from '@/lib/MobilePopupContext';
import Skeleton from '../Assets/Skeleton';
import NextLink from '../Assets/NextLink';
import IconChevronLeft from '../Icons/IconChevronLeft';
import HeaderSetTitle from '../Layout/HeaderSetTitle';
import { modelStr } from '@/constant/constants';
import TextInput from '../Form/TextField/TextInput';
import IconGridOutline from '../Icons/IconGridOutline';

type Props = {
  pageType: ArchivePage;
};

export default function CategoryList(props: Props) {
  const { pageType } = props;
  const {data , isLoading} = useGetCategoresQuery()
  const {
    filters: { categoryId }
  } = useFilters();
  const { setContent } = useMobilePopup();



  const categoryList = (
    <>
      {isLoading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <div
              key={index}
              className="flex w-full items-center justify-between border-l-[3px] border-solid border-hgray-300 py-3 pl-2 pr-1"
            >
              <Skeleton width={'100px'} height={'22px'} />
              <span>
                <Skeleton width={'22px'} height={'22px'} />
              </span>
            </div>
          ))}
        </>
      ) : (
        <div>
          <NextLink
            withQueryString
            className={clsx(
              !categoryId && 'border-primary-300',
              `flex w-full items-center justify-between border-r-[3px] border-solid py-3 pl-1 pr-4 text-base text-primary-700 `
            )}
            href={`/${pageType}s`}
          >
            همه
            <IconChevronLeft width={22} height={22} />
          </NextLink>
          {data?.map((item) => (
            <NextLink
              withQueryString
              key={item?.id}
              style={{ color: item?.color }}
              className={clsx(
                categoryId && categoryId === item.id && 'border-primary-300 bg-primary-100/20',
                `mt-1 flex w-full items-center justify-between border-r-[3px]  border-solid py-3 pl-1 pr-4 text-base`
              )}
              href={`/${pageType}s/${item?.slug}-${item?.id}`}
            >
              {item?.name}
              <IconChevronLeft width={22} height={22} />
            </NextLink>
          ))}
        </div>
      )}
    </>
  );

  const handleOpenModal = () => {
    setContent({
      content: categoryList,
      origin: 'bottom',
      modalHeader: 'دسته بندی ها',
      closeBtn: true
    });
  };

  const findCategoryName = () => {
    return data?.find((i) => i?.id === categoryId)?.name;
  };
  return (
    <>
      <Hidden hidden="lg">
        <HeaderSetTitle
          label={
            categoryId
              ? `${modelStr[pageType]?.sumc} ${findCategoryName()}`
              : modelStr[pageType]?.sum ?? ''
          }
          backUrl={categoryId ? `/${pageType}s` : '/'}
        />
      </Hidden>
      <Hidden hidden="max-lg">{categoryList}</Hidden>
      <div className="lg:hidden" onClick={() => handleOpenModal()}>
        <TextInput
          readOnly
          className="block cursor-text dark:bg-mdark-400 lg:hidden"
          Icon={IconGridOutline}
          placeholder={categoryId ? findCategoryName() : 'جستجو بر اساس دسته بندی'}
        />
      </div>
    </>
  );
}
