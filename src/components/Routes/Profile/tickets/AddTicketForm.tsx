"use client"
import Button from '@/components/Assets/Button'
import Paper from '@/components/Assets/Paper'
import ImageUploader from '@/components/Form/ImageUploader'
import TextField from '@/components/Form/TextField'
import IconLoading from '@/components/Icons/IconLoading'
import useNextRouter from '@/hooks/useNextRouter'
import { useAddTicketMutation } from '@/lib/services/ticket'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import DepartmanList from './DepartmanList'

export default function AddTicketForm() {
  const [submit, { isLoading, isSuccess, data }] = useAddTicketMutation();
  const form = useForm();
  const router = useNextRouter();
  const handleSubmit = (values: any) => {
    const res = submit({ ...values });
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success('تیکت شما با موفقیت ثبت شد.');
      router.push('/profile/tickets');
    }
  }, [isSuccess])

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DepartmanList />

          <Paper className='flex flex-col gap-6 mt-10'>
            <TextField className='bg-white' name='title' label='موضوع تیکت' required />

            <TextField className='bg-white' wrapperClassName='lg:items-start' multiple name='text' label='متن' required />

            <ImageUploader name='file' label='افزودن مستندات' />

            <Button className='w-full lg:max-w-[200px]' type='submit' disabled={isLoading || isSuccess}>
              {isLoading ? <IconLoading className='mx-auto' width={22} height={22} /> : "ثبت تیکت"}
            </Button>

          </Paper>
        </form>
      </FormProvider>
    </div>
  )
}
