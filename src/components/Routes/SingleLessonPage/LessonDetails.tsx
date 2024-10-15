import Button from '@/components/Assets/Button';
import Paper from '@/components/Assets/Paper';
import SinglePageHeader from '@/components/Assets/SinglePageHeader';
import Divider from '@/components/Divider';
import { LessenItem } from '@/types';
import LessonInfo from './LessonInfo';
type Props = {
    course_title: string
} & LessenItem

export default function LessonDetails(props: Props) {
    const { title, categories, url_video, course_title, courses: { type } } = props;
    return (
        <div className='flex flex-col gap-6'>
            {type !== 'podcast' && <LessonInfo
                {...props}
            />}
            <Paper>
                <h3 className='mb-8 dark:text-text-dark-4'>{course_title}</h3>

                <SinglePageHeader title={title} categories={categories} />

                <Divider space={'my-[20px]'} />

                <div className='flex justify-end my-4'>
                    <Button
                        size='large'
                        rounded='lg'
                        className='rounded-full bg-primary-300 font-normal text-base px-5'
                        href={url_video}
                        target='_blank'
                    >دانلود فایل</Button>
                </div>

            </Paper>
        </div>
    )
}
