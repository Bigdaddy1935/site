'use client';

import formatFullName from '@/lib/formatFullName';
import EmptyButton from '../Assets/EmptyButton';
import Image from '../Assets/Image';
import Skeleton from '../Assets/Skeleton';
import TextInput from '../Form/TextField/TextInput';
import { useFilters } from './FilterContext';
import IconHuman from '../Icons/IconHuman';
import { useGetTeachersQuery } from '@/lib/services/base';
import { useMobilePopup } from '@/lib/MobilePopupContext';
import useHidden from '@/hooks/useHidden';
import usePopup from '@/hooks/usePopup';
import { Teacher } from '@/types';

export default function TeacherSelect() {
  const { setOpen, open, wrapperRef } = usePopup();
  const { isHidden } = useHidden();
  const { filters, handleSetFilters } = useFilters();
  const { setContent } = useMobilePopup();
  const { data, isLoading } = useGetTeachersQuery();

  const handleSelect = (teacher: Teacher | null) => {
    handleSetFilters({
      teacher: teacher
        ? `${formatFullName(teacher.fullname).replaceAll(' ', '_')}_${teacher.id}`
        : null
    });
    setOpen(false);
  };

  const teacherList = (
    <>
      {isLoading ? (
        <>
          {[...Array(5)].map((_, index) => (
            <div
              onClick={() => setOpen(false)}
              key={index}
              className="my-0.5 flex items-center justify-between rounded-lg bg-gradient-to-r from-primary-400 from-0% to-white to-30% p-1 hover:to-100%"
            >
              <Skeleton width={'100px'} />

              <Skeleton width={'40px'} height={'40px'} containerClassName="rounded-full" />
            </div>
          ))}
        </>
      ) : (
        <>
          {filters?.teacher && (
            <EmptyButton
              onClick={() => handleSelect(null)}
              className="to-to-hgray-200 my-0.5 flex h-[40px] w-full items-center justify-between rounded-lg bg-gradient-to-r from-primary-400 from-0% to-30% p-1 hover:to-100%"
            >
              <span className="text-base text-hgray-400">{'همه'}</span>
            </EmptyButton>
          )}
          {data?.map((item) => (
            <EmptyButton
              onClick={() => handleSelect(item)}
              key={item.id}
              className="my-0.5 flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-primary-400 from-0% to-hgray-200 to-30% p-1 hover:to-100%"
            >
              <span className="text-base text-hgray-400">{formatFullName(item.fullname)}</span>

              <Image
                src={item.picture ?? '/default-profile.png'}
                width={40}
                height={40}
                className="rounded-full"
                alt=""
              />
            </EmptyButton>
          ))}
        </>
      )}
    </>
  );

  return (
    <div className="relative">
      <TextInput
        readOnly
        className="cursor-text outline-none dark:bg-mdark-400"
        //    onFocus={() => setOpen(true)}
        onClick={() =>
          isHidden('max-lg')
            ? setContent({
                content: <div className="custom-scrollbar overflow-y-auto">{teacherList}</div>,
                origin: 'bottom'
              })
            : setOpen(true)
        }
        placeholder={
          filters.teacher
            ? formatFullName(data?.find((i) => i.id === Number(filters.teacher))?.fullname)
            : 'انتخاب استاد'
        }
      />

      <IconHuman
        width={24}
        height={24}
        className="absolute left-2 top-2 text-primary-400 dark:text-primary-100"
      />

      {open ? (
        <div
          ref={wrapperRef}
          className="custom-scrollbar absolute left-0 right-0 top-[50px] z-[30] max-h-[250px] overflow-y-auto rounded-xl bg-white p-2 shadow-lg"
        >
          {teacherList}
        </div>
      ) : null}
    </div>
  );
}
