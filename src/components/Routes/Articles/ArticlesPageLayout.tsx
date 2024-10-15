import ArchiveLayout from '@/components/ArchiveLayout'
import Container from '@/components/Assets/Container'
import { BlogListItem } from '@/types'
import { PaginateData } from '@/types/response'
import React from 'react'


export type ArticlesPageLayoutProps = {
    articles : PaginateData<BlogListItem>
}
export default function ArticlesPageLayout({articles} : ArticlesPageLayoutProps) {
  return (
    <Container>
    <ArchiveLayout
      mostLikes
      pageType="article"
      data={articles?.data}
      pageTitle="مقالات"
      filterKeys={{
        categories: "categoryId",
        title: "search",
      }}
      teacherSelectHidden
    />
</Container>
  )
}
