import Hidden from "@/components/Assets/Hidden";
import Comments from "@/components/Comments";
import HeaderSetTitle from "@/components/Layout/HeaderSetTitle";
import { BlogItem, CommentItem } from "@/types";
import { PaginateData } from "@/types/response";
import React from "react";
import ArticleContent from "./ArticleContent";
import ArticleHeader from "./ArticleHeader";
import ArticleTagList from "./ArticleTagList";

export type ArticlePageLayoutProps = {
  article: BlogItem;
  articleComments: PaginateData<CommentItem>;
};
export default function ArticlePageLayout(props: ArticlePageLayoutProps) {
  const { article, articleComments } = props;
  return (
    <React.Fragment>
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
        id={article.id}
      />
    </React.Fragment>
  );
}
