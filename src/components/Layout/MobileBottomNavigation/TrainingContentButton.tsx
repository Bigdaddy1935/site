'use client';
import NextLink from '@/components/Assets/NextLink';
import IconArticle from '@/components/Icons/IconArticle';
import IconBxBookReader from '@/components/Icons/IconBxBookReader';
import IconBxsVideos from '@/components/Icons/IconBxsVideos';
import IconCart3 from '@/components/Icons/IconCart3';
import IconFileMusic from '@/components/Icons/IconFileMusic';
import IconGraduationCap from '@/components/Icons/IconGraduationCap';
import IconTvOutline from '@/components/Icons/IconTvOutline';
import { useMobilePopup } from '@/lib/MobilePopupContext';
import NavigationButton from './NavigationButton';

export default function TrainingContentButton() {
  const { setContent, content, setOpen, open } = useMobilePopup();
  return (
    <NavigationButton
      label="محتوای آموزشی"
      type="button"
      Icon={IconBxBookReader}
      onClick={() =>
        open
          ? setOpen(false)
          : setContent({
              content: <ModalContent />,
              origin: 'bottom',
              modalHeader: 'محتوای آموزشی',
              closeBtn: true
            })
      }
    />
  );
}

const items = [
  {
    label: 'محصولات',
    href: '/products',
    IconComponent: IconCart3
  },
  {
    label: 'دوره ها',
    href: '/courses',
    IconComponent: IconGraduationCap
  },
  {
    label: 'مقالات',
    href: '/articles',
    IconComponent: IconArticle
  },
  {
    label: 'رسانه',
    href: '/media',
    IconComponent: IconBxsVideos
  },
  {
    label: 'پادکست',
    href: '/podcasts',
    IconComponent: IconFileMusic
  },
  {
    label: 'صدا و سیما',
    href: '/tv',
    IconComponent: IconTvOutline
  }
];
function ModalContent() {
  return (
    <div className="mt-7 flex h-[300px] flex-wrap content-start items-center justify-between gap-y-7">
      {items.map(({ href, IconComponent, label }) => (
        <NextLink key={href} href={href} className="flex w-[33.333%] flex-col  items-center">
          <span className="flex  h-16 w-16 items-center justify-center rounded-full bg-primary-100">
            <IconComponent className=" text-hgray-200" width={24} height={24} />
          </span>
          <span className="mt-4 text-base font-semibold text-hgray-600 dark:text-text-dark-3">{label}</span>
        </NextLink>
      ))}
    </div>
  );
}
