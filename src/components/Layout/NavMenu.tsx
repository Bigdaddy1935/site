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
      
        <DesktopMoreItemsPopup />
      {/*             <div className='flex-1 w-[200px] h-[60px] hidden lg:block lg:z-30' />
       */}{' '}
    </div>
  );
}
