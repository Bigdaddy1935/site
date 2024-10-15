import EmptyButton from '@/components/Assets/EmptyButton';
import Hidden from '@/components/Assets/Hidden';
import NextLink from '@/components/Assets/NextLink';
import IconCaretDown from '@/components/Icons/IconCaretDown';
import DesktopMoreItemsPopup from './DesktopMoreItemsPopup';
import EducationContent from './EducationContent';
import CategoryList from './CategoryList';

const items = [
  {
    title: 'مهدیارشو',
    href: '/club'
  },
  {
    title: 'رسانه',
    href: '/media/medias'
  },
  {
    title: 'مقالات',
    href: '/articles'
  }
];
export default function NavMenu() {
  return (
    <div className="flex flex-1 flex-col items-stretch gap-2 px-4 lg:flex-row">
      <CategoryList />
      {items.map((item) => (
        <NextLink
          className="inline-block p-2 text-size-4 font-medium leading-10 text-primary-700 dark:text-white lg:z-30"
          href={item.href}
          key={item.href}
        >
          {item.title}
        </NextLink>
      ))}
      <EducationContent />
      <div className="group flex w-full lg:w-auto  lg:items-center lg:justify-start">
        <Hidden hidden="max-lg">
          <EmptyButton className="rtr peer mr-3 flex w-full items-center font-semibold text-primary-300 dark:text-mdark-300 lg:w-auto ">
            بیشتر
            <IconCaretDown width={22} height={22} />
            <div className="mx-3  block h-0.5 flex-1 bg-hgray-300 dark:bg-mdark-400" />
          </EmptyButton>
        </Hidden>
        <DesktopMoreItemsPopup />
      </div>
      {/*             <div className='flex-1 w-[200px] h-[60px] hidden lg:block lg:z-30' />
       */}{' '}
    </div>
  );
}
