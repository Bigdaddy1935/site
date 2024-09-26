import Container from "@/components/Assets/Container";
import Hidden from "@/components/Assets/Hidden";
import LoadingBox from "@/components/Assets/LoadingBox";
import Comments from "@/components/Comments";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import ArticleContent from "@/components/Routes/SingleBlogPage/ArticleContent";
import ArticleHeader from "@/components/Routes/SingleBlogPage/ArticleHeader";
import ArticleTagList from "@/components/Routes/SingleBlogPage/ArticleTagList";
import { htmlRemoveRegex } from "@/constant/constants";
import { getArticle, getArticleComments } from "@/lib/fetch";

import { abort } from "process";
import { Suspense } from "react";

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

  const { article } = await getArticle(articleId);

  const articleComments = await getArticleComments(articleId);
  return (
    <Container className="my-10">
      <Suspense fallback={<LoadingBox />}>
        <Hidden hidden="lg">
          <HeaderSetTitle label={article?.title} needAnimation={true} />
        </Hidden>
        <ArticleTagList items={article?.tagged} />

        <ArticleHeader {...article} />

        <ArticleContent content={article?.description} />

        <Comments
          model="article"
          type="App\\Models\\Article"
          comments={articleComments}
          id={Number(articleId)}
        />
      </Suspense>
    </Container>
  );
}
