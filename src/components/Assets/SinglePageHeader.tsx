import Link from 'next/link';
import { Category } from '@/types/';

type Props = {
    title: string;
    categories: Category[]
}

export default function SinglePageHeader(props: Props) {
    const { categories, title } = props;

    const category = categories?.[0];
    return (
        <div className='flex items-center'>
            {category &&
                <Link
                    className='overflow-hidden ml-3 leading-8 text-transparent hover:text-white text-center w-[0] rounded-xl hover:w-[120px] h-8 px-2 transition-all'
                    style={{
                        backgroundColor: category?.color
                    }} href={`/articles/${category?.slug}-${category?.id}`}>
                    {category.name}
                </Link>
            }
            <h1 className='font-semibold text-xl text-primary-900 dark:text-text-dark-1 ml-4'>{title}</h1>
        </div>
    )
}
