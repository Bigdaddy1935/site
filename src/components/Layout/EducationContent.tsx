'use client';
import clsx from 'clsx';
import EmptyButton from '@/components/Assets/EmptyButton';
import NextLink from '@/components/Assets/NextLink';
import IconCaretDown from '@/components/Icons/IconCaretDown';
import IconCart3 from '@/components/Icons/IconCart3';
import IconFileMusic from '@/components/Icons/IconFileMusic';
import IconGraduationCap from '@/components/Icons/IconGraduationCap';
import IconTvOutline from '@/components/Icons/IconTvOutline';
import usePopup from '@/hooks/usePopup';

const items = [
  {
    label: 'محصولات',
    href: '/products',
    IconComponent: IconCart3,
    desc: 'آموزش تخصصی در چند ساعت و جلسه به همراه پشتیبانی سوالات مخاطبین'
  },
  {
    label: 'دوره ها',
    href: '/courses',
    IconComponent: IconGraduationCap,
    desc: 'توضیح کامل یک موضوعات در درس های مختلف برای درک کامل محتوا'
  },
  {
    label: 'پادکست',
    href: '/podcasts',
    IconComponent: IconFileMusic,
    desc: 'پرسش مخاطبین و پاسخ صوتی متخصص'
  },
  {
    label: 'صدا و سیما',
    href: '/tv',
    IconComponent: IconTvOutline,
    desc: 'محتوا عرضه شده در کانال های تلویزیونی'
  }
];

export default function EducationContent() {
  const { open, setOpen, wrapperRef } = usePopup();
  return (
    <div
      ref={wrapperRef}
      className="group relative  w-full lg:flex lg:w-auto  lg:items-center lg:justify-start"
    >
      <EmptyButton
        onClick={() => setOpen(!open)}
        className="flex w-full items-center font-medium text-primary-700 dark:text-white  max-lg:justify-between lg:w-auto "
      >
        محتوای آموزشی
        <IconCaretDown className={`${open && 'rotate-180'}`} width={22} height={22} />
      </EmptyButton>
      <div
        className={clsx(
          'flex-1 flex-wrap justify-between gap-3 overflow-hidden rounded-lg transition-all duration-500 max-lg:mt-4 lg:absolute lg:flex lg:w-[500px] lg:translate-y-4 lg:bg-hgray-200 lg:p-4 lg:delay-75  lg:dark:bg-mdark-600',
          open
            ? 'z-10 shadow-lg opacity-100 max-lg:h-[190px] lg:top-[100%]  lg:h-[200px]'
            : 'h-0 select-none opacity-0 lg:top-[-100%] lg:-z-50'
        )}
      >
        {items.map(({ IconComponent, href, label, desc }) => (
          <NextLink
            className="flex min-w-[180px] flex-1 items-center py-2 text-hgray-600 transition-colors hover:text-primary-300 dark:text-hgray-300 dark:hover:text-text-dark-1"
            href={href}
            key={label}
          >
            <span className="lg:ml-3 ">
              <IconComponent className="text-primary-300" width={32} height={32} />
            </span>
            <span className="flex-1">
              <span className="pb-3 font-medium">{label}</span>
              <span className="hidden text-xs lg:block">{desc}</span>
            </span>
          </NextLink>
        ))}
      </div>
    </div>
  );
}
