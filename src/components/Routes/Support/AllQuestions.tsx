'use client';
import ContentBox from '@/components/Assets/ContentBox';
import EmptyButton from '@/components/Assets/EmptyButton';
import EmptyGrid from '@/components/Assets/EmptyGrid';
import ScrollToHere from '@/components/Assets/ScrollToHere';
import Divider from '@/components/Divider';
import IconMathPlus from '@/components/Icons/IconMathPlus';
import IconMinus from '@/components/Icons/IconMinus';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { DepartmanQuestion } from '@/types/';
import { PaginateData } from '@/types/response';

export default function AllQuestions(props: Partial<PaginateData<DepartmanQuestion>>) {
  const [open, setOpen] = useState<number | null>(null);
  const { data = [], current_page, last_page } = props;
  const departmanId = useSearchParams().get('departeman');
  return (
    <div className="mt-24">
      <h3 className="mb-4 text-2xl font-semibold text-hgray-600 dark:text-white">سوالات پرتکرار</h3>
      <ScrollToHere scroll={departmanId} />
      <div className="flex flex-col justify-between gap-5">
        {data.length > 0 ? (
          data.map((item) => (
            <QuestionItem
              key={item.id}
              id={item.id}
              content={item.answer}
              title={item.question}
              open={open}
              setOpen={setOpen}
            />
          ))
        ) : (
          <EmptyGrid />
        )}
      </div>
    </div>
  );
}

type QuestionItemProps = {
  open: number | null;
  setOpen: (open: number | null) => void;
  id: number;
  title?: string;
  content?: string;
};
export function QuestionItem(props: QuestionItemProps) {
  const { open, setOpen, id, title, content } = props;
  return (
    <div
      id={`question${11}`}
      className="group flex-auto  cursor-pointer rounded-lg bg-hgray-200 p-3  dark:bg-mdark-600"
    >
      <div
        onClick={() => setOpen(open === id ? null : id)}
        className="flex items-center justify-between  text-lg text-hgray-600 dark:text-white"
      >
        <span>{title}</span>

        <EmptyButton>
          {open !== id ? (
            <IconMathPlus width={28} height={28} className="text-primary-300" />
          ) : (
            <IconMinus width={28} height={28} className="text-primary-300" />
          )}
        </EmptyButton>
      </div>
      <ContentBox open={open === id}>
        <Divider space="my-3" />

        <div className="px-1 pb-3 text-sm leading-6 text-hgray-500 dark:text-white">{content}</div>
      </ContentBox>
    </div>
  );
}
