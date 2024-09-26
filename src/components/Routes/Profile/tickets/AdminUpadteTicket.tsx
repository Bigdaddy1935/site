'use client';
import LoadingButton from '@/components/Assets/LoadingButton';
import Select from '@/components/Form/Select';
import { useUpdateTicketsMutation } from '@/lib/services/admin';
import { useGetDepartmansQuery } from '@/lib/services/ticket';
import { useState } from 'react';
import { toast } from 'react-toastify';

type Props = {
  departeman: number;
  ticket_id: number;
};

export default function AdminUpadteTicket({ departeman, ticket_id }: Props) {
  const [departamnId, setDepartmanId] = useState<number>(departeman);
  const [sendSms, setSendSms] = useState<0 | 1>(0);
  const { data = [], isLoading } = useGetDepartmansQuery();
  const [update, { isLoading: updateLoading }] = useUpdateTicketsMutation();
  const handleUpdate = () => {
    update({
      ticket_id,
      department_id: departamnId,
      send_sms: sendSms
    }).then(({ error }) => {
      if (!error) toast.success('اطلاعات با موفقیت ویرایش شد');
    });
  };
  return (
    <div className="flex flex-col items-start gap-3 lg:flex-row">
      <p></p>
      <div>
        <Select
          label="انتخاب دپارتمان"
          isLoading={isLoading}
          value={departamnId}
          onChange={(id) => setDepartmanId(id)}
          items={data.map((i) => ({ label: i.name, value: i.id }))}
        />

        <label className="flex cursor-pointer items-center text-[14px] font-medium text-hgray-600">
          <input
            value={sendSms}
            onChange={(e) => (e.target.checked ? setSendSms(1) : setSendSms(0))}
            checked={sendSms === 1}
            type="checkbox"
            className="m-2 inline-block p-2"
          />
          ارسال پیام به استاد
        </label>
      </div>

      <LoadingButton onClick={handleUpdate} loading={updateLoading || isLoading} className="w-28">
        ثبت
      </LoadingButton>
    </div>
  );
}
