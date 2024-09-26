'use client';
import BoxButton from '@/components/Assets/BoxButton';
import Hidden from '@/components/Assets/Hidden';
import Skeleton from '@/components/Assets/Skeleton';
import IconChevronLeft from '@/components/Icons/IconChevronLeft';
import IconEdit from '@/components/Icons/IconEdit';
import { QuestionItem } from '@/components/Routes/Support/AllQuestions';
import { useMobilePopup } from '@/lib/MobilePopupContext';
import { useGetDepartmanByIdQuery, useGetDepartmansQuery } from '@/lib/services/ticket';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { TicketDepartmanList } from '@/types/';
export default function DepartmanList() {
  const { data } = useGetDepartmansQuery();
  const { setContent } = useMobilePopup();
  const { control, watch } = useFormContext();
  const [open, setOpen] = useState<null | number>(null);
  const department_id = watch('department_id');
  const { data: questions, isLoading: getQuestionsIsloading } = useGetDepartmanByIdQuery(
    {
      id: department_id
    },
    {
      skip: !department_id,
      refetchOnMountOrArgChange: true
    }
  );

  return (
    <Controller
      control={control}
      name="department_id"
      rules={{
        required: 'جهت ارسال تیکت دپارتمان مورد نظر را انتخاب نمایید'
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <Hidden hidden="lg">
            <BoxButton
              onClick={() =>
                setContent({
                  content: (
                    <DepartemanListItems
                      value={value}
                      data={data}
                      onChange={(value) => onChange(value)}
                    />
                  )
                })
              }
              text={value ? data?.find((i) => i.id === value)?.name : 'انتخاب دپارتمان'}
              showTextInMobile
              leftContent={
                value ? (
                  <IconEdit width={24} height={24} />
                ) : (
                  <IconChevronLeft width={24} height={24} />
                )
              }
              className={`flex-1 cursor-pointer lg:text-center `}
            />
          </Hidden>
          <Hidden hidden="max-lg">
            <DepartemanListItems value={value} data={data} onChange={(value) => onChange(value)} />
          </Hidden>

          {error ? (
            <p className="mt-3 text-sm font-semibold text-rose-500">{error.message}</p>
          ) : null}

          <div className="mt-6 flex flex-col gap-4">
            {getQuestionsIsloading ? (
              <Skeleton width="100%" height="70px" />
            ) : (
              questions?.department.questions.map((qu) => (
                <QuestionItem
                  open={open}
                  setOpen={setOpen}
                  id={qu.id}
                  content={qu.answer}
                  title={qu.question}
                  key={qu.id}
                />
              ))
            )}
          </div>
        </div>
      )}
    />
  );
}

type DepartemanListProps = {
  data: TicketDepartmanList[] | undefined;
  onChange: (id: number) => void;
  value: number;
};

function DepartemanListItems(props: DepartemanListProps) {
  const { data, onChange, value } = props;
  return (
    <div className="flex flex-col justify-between gap-[5%] gap-y-2 pb-[76px] lg:flex-row lg:flex-wrap lg:pb-0">
      {data?.map((item) => (
        <BoxButton
          onClick={() => onChange(item.id)}
          text={item.name}
          key={item.id}
          showTextInMobile
          leftContent={
            <Hidden hidden="lg">
              <IconChevronLeft width={24} height={24} />
            </Hidden>
          }
          className={`flex-1 cursor-pointer lg:text-center ${value === item.id && 'bg-[#F7E2DE] dark:bg-hgray-600'}`}
        />
      ))}
    </div>
  );
}
