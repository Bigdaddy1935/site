import { BlogListItem } from '@/types/';
import { PaginateData } from '@/types/response';
import { Query } from './axios';

export const siteMetadata = {
  title: 'Next.js Blog With Tailwind CSS and Contentlayer',
  author: 'Rohbakhsh Academy',
  headerTitle: 'آکادمی روح بخش',
  description: 'r.',
  language: 'fa-IR',
  theme: 'system', // system, dark or light
  siteUrl: '', // your website URL
  siteLogo: '/logo.png',
  socialBanner: '/social-banner.png', // add social banner in the public folder
  email: 'codebucks27@gmail.com',
  github: 'https://github.com',
  twitter: 'https://twitter.com',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com',
  linkedin: 'https://www.linkedin.com/',
  dribbble: 'https://www.dribbble.com',
  locale: 'en-US'
};

export const getAllArticels = async () => {
  let articels: BlogListItem[] = [];
  let page: number | null = 1;
  while (page !== null) {
    let query: any = await Query<PaginateData<BlogListItem>>(`/articles/get`, { params: { page } });
    await delay;

    if (typeof query === 'boolean') {
      return articels;
    }
    articels = [...articels, ...query.data];

    page = query.current_page === query.last_page ? null : page + 1;
  }

  return articels;
};

const delay = new Promise((resolve) => {
  setTimeout(() => resolve(true), 10);
});

export const isExists = (value: any): boolean => {
  return value!== '<p>null</p>' && value !== 'null' && value !== 'undefined' && Boolean(value);
};
