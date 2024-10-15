import Container from "@/components/Assets/Container";

import ArticlePageClient from "@/components/Routes/SingleBlogPage/ArticlePageClient";
import ArticleTagList from "@/components/Routes/SingleBlogPage/ArticleTagList";
import { htmlRemoveRegex } from "@/constant/constants";
import { cFetch, getArticle, getArticleComments } from "@/lib/fetch";

import { abort } from "process";

export async function generateStaticParams() {
  const articles = await cFetch(`/articles/ids`);

  return articles.map((article : any) => ({
    slug: `content-${article.id}`,
  }));
}
 async function fetchMYData(articleId: string) {
  try {
    const { article } = await getArticle(articleId);

    const articleComments = await getArticleComments(articleId);

    return {
      article,
      articleComments,
    };
  } catch (error) {
    throw new Error("Failed to fetch revenue data.");
  }
}

type Props = {
  params: {
    slug: string;
  };
};
export async function generateMetadata({ params: { slug } }: Props) {
  const articleId = slug.split("-")[1];

  if (!articleId) return {};
  const article = await getArticle(articleId);

  const { article: articleData } = article;

  const shortDescription = articleData?.description
    .slice(200)
    .replaceAll(htmlRemoveRegex, "");
  return {
    title: articleData?.title,
    description: shortDescription,
    openGraph: {
      title: `${articleData?.title} | آکادمی روح بخش`,
      description: shortDescription,
    },
  };
}

export default async function BlogPage(props: Props) {
  const {
    params: { slug },
  } = props;
  const articleId = slug?.split("-")[1];

  if (!articleId) abort();

  const { article, articleComments } = await fetchMYData(articleId);
  return (
    <Container className="my-10">
      <ArticlePageClient article={article} articleComments={articleComments} />
    </Container>
  );
}
