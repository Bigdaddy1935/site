import Image from "@/components/Assets/Image";
import NextLink from "@/components/Assets/NextLink";
import IconArrowLeftShort from "@/components/Icons/IconArrowLeftShort";
import { toPersianDateFormat } from "@/lib/toPersianDateFormat";
import { NewsItem } from "@/types/";

const models: { [key: string]: string } = {
    "article": "content"
}
export default function NewsItems(props: NewsItem) {
    const { body, id, model_id, model_type, picture, title, updated_at } = props;
    const getLinkHref = () => {
        const model = model_type.split('\\').pop()?.toLocaleLowerCase();
        if (!model) return "#";
        if (models[model]) return `/${model}/${models[model]}-${model_id}`

        return `/${model}/${model}-${model_id}`;
    }
    return (
        <div className="flex flex-col lg:flex-row justify-between py-3 border-b border-solid border-hgray-300 dark:border-mdark-400">
            <div className="relative w-full lg:w-[260px] h-[200px] lg:h-[140px]">
                <Image src={picture ?? '/temp-images/course-card.jpg'} fill className="object-contain" alt={title} />
            </div>
            <div className="flex-1 flex flex-col  ps-2 mt-4 lg:mt-1">
                <h2 className="text-lg font-semibold text-hgray-600 dark:text-white">{title}</h2>
                <span className="font-light dark:text-hgray-300 text-hgray-400">{toPersianDateFormat(updated_at)}</span>
                <div className="text-hgray-500 dark:text-hgray-400 text-sm" dangerouslySetInnerHTML={{ __html: body }} />
                {model_type ?
                    <div className="flex flex-1 items-end justify-end">
                        <NextLink className="flex lg:border lg:border-solid border-primary-300 dark:border-mdark-500 rounded-lg  px-2 lg:py-1 items-center text-primary-300 hover:text-primary-700 hover:border-primary-700 dark:text-text-dark-2" href={getLinkHref()}>
                            <span>مشاهده</span>
                            <IconArrowLeftShort width={22} height={22} />
                        </NextLink>
                    </div> : null}
            </div>

        </div>
    )
}
