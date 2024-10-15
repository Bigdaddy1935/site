
export default function ArticleContent({ content }: { content: string }) {
    return (
        <article className="text-justify mt-10 !font-iransans article-container text-hgray-500 dark:text-white leading-10"  dangerouslySetInnerHTML={{ __html: content }} />
    )
}
