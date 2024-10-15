'use client';
import clsx from 'clsx';
import EmptyButton from '@/components/Assets/EmptyButton';
import Image from "@/components/Assets/Image";
import Divider from '@/components/Divider';
import TextField from '@/components/Form/TextField';
import IconArrowLeftShort from '@/components/Icons/IconArrowLeftShort';
import IconFileEarmarkZip from '@/components/Icons/IconFileEarmarkZip';
import IconLoading from '@/components/Icons/IconLoading';
import formatFullName from '@/lib/formatFullName';
import { useReplyTicketMutation } from '@/lib/services/ticket';
import { toPersianDateTimeFormat } from '@/lib/toPersianDateFormat';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Ticket, TicketAnswer } from '@/types/';
import AdminUpadteTicket from './AdminUpadteTicket';
import TicketFileInput from './TicketFileInput';
import { useTicketList } from './TicketProvider';

export default function TicketDetials(props: Ticket) {
  const { id, ticket_answer, ...item } = props;
  const { isAdmin } = useTicketList();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollIntoView({ block: 'end' });
  }, []);
  return (
    <div className="relative mx-auto flex max-h-full w-full flex-col rounded-lg bg-hgray-200 p-3 pb-[70px] dark:bg-mdark-600">
      <TicketSummery {...props} />

      <Divider space="my-3" />

      {isAdmin && (
        <div className="w-[50%]">
          <p className=" mb-4 text-xl font-medium text-hgray-400 dark:text-hgray-200">{'ویرایش'}</p>
          <AdminUpadteTicket ticket_id={id} departeman={item.department_id} />
        </div>
      )}
      <Divider space="my-3" />

      <div className="custom-scrollbar max-h-full flex-1 flex-col overflow-y-auto p-2">
        <TicketAnswerItem
          {...({
            user: item.user,
            text: item.text,
            file: item.file,
            updated_at: item.updated_at,
            id: `ticket${id}`
          } as unknown as TicketAnswer)}
        />
        {ticket_answer.map((i) => (
          <TicketAnswerItem key={i.id} {...i} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <AddReply ticket_id={id} />
      </div>
    </div>
  );
}

function TicketSummery(item: Ticket) {
  const { setShowDetails, isAdmin } = useTicketList();
  const adminDetails = [
    {
      title: 'نام کاربر',
      value: `${item.user.username}(${formatFullName(item.user.fullname)})`
    }
  ];
  const details = [
    {
      title: 'دسته بندی',
      value: item.user_department.name
    },
    {
      title: 'وضعیت',
      value: item.status
    },
    {
      title: 'کد تیکت',
      value: item.id
    },
    {
      title: 'تاریخ ایجاد',
      value: <span className="ltr inline-block">{toPersianDateTimeFormat(item.created_at)}</span>
    }
  ];
  return (
    <div className="flex flex-wrap justify-between gap-y-2">
      <div className="flex w-full items-center justify-between">
        <div className="w-full flex-1">
          <p className="text-sm text-hgray-400 dark:text-hgray-200">عنوان:</p>

          <p className="text-base font-normal text-hgray-600 dark:text-white">{item.title}</p>
        </div>

        <EmptyButton
          onClick={() => setShowDetails(null)}
          className="flex items-center dark:text-white"
        >
          <span>بازگشت</span>

          <IconArrowLeftShort width={22} height={22} />
        </EmptyButton>
      </div>
      {[...(isAdmin ? adminDetails : []), ...details].map((i) => (
        <div key={i.title} className="w-[50%]">
          <p className="text-sm text-hgray-400 dark:text-hgray-200">{i.title}</p>

          <p className="text-base font-normal text-hgray-600 dark:text-white">{i.value}</p>
        </div>
      ))}
    </div>
  );
}

function TicketAnswerItem(i: TicketAnswer) {
  return (
    <div
      key={i.id}
      className={clsx(
        `mt-3 flex`,
        i.who_answered === 'user' ? 'justify-start' : 'flex-row-reverse'
      )}
    >
      <div className={`${i.who_answered === 'user' ? 'ml-2' : 'mr-2'}`}>
        <Image
          alt=""
          width={45}
          height={45}
          className="h-[45px] rounded-full object-cover  object-top"
          src={i.user.picture ?? '/default-profile.png'}
        />
      </div>
      <div
        className={clsx(
          `relative w-[75%] min-w-[140px] max-w-2xl rounded-lg p-5`,
          i.who_answered === 'user' ? 'bg-white text-hgray-600' : 'bg-primary-300 text-white'
        )}
      >
        <p className="mb-6 font-medium text-primary-800 datk:text-text-dark-3">
          {i.who_answered === 'user'
            ? `${formatFullName(i.user.fullname)} | کاربر`
            : 'آکادمی روح بخش | کارشناس'}
        </p>
        <p className="mb-6 text-sm">{i.text}</p>

        {i.file ? (
          <div>
            <Divider space="my-4" />
            <Link className="flex items-center" href={i.file} target="_blank">
              <IconFileEarmarkZip className="ml-2" width={22} height={22} />

              <span>{i.file.split('/').pop()}</span>
            </Link>
          </div>
        ) : null}

        <p className="ltr absolute bottom-1 left-3 text-sm">
          {toPersianDateTimeFormat(i.updated_at)}
        </p>
      </div>
    </div>
  );
}

function AddReply({ ticket_id }: { ticket_id: number }) {
  const [reply, { isLoading }] = useReplyTicketMutation();
  const form = useForm();
  const ref = useRef<HTMLInputElement>(null);
  const file = form.watch('file');

  const handleSubmit = async (values: any) => {
    const response = await reply({
      ...values,
      ticket_id
    });

    if (!response.error) form.reset();
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex items-baseline p-2">
          <div className="flex h-[48px] w-[138px] items-stretch">
            <EmptyButton
              type="submit"
              className="rounded-lg bg-white  px-4 text-primary-300 dark:bg-mdark-400"
            >
              {isLoading ? <IconLoading width={22} height={22} /> : 'ارسال'}
            </EmptyButton>
            <TicketFileInput />
          </div>
          <div className="flex-1 rounded-lg bg-white p-2 dark:bg-mdark-400">
            {file ? (
              <Image
                width={150}
                className="mb-5 rounded-lg border border-solid border-primary-300 object-contain"
                height={200}
                alt=""
                src={URL.createObjectURL(file)}
              />
            ) : null}
            <TextField
              wrapperClassName="mb-0 lg:mb-0 lg:min-w-fit"
              name="text"
              placeholder="متن خود را وارد کنید..."
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
