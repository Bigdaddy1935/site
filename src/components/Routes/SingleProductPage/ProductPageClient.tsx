"use client"

import LayoutLoading from '@/components/Assets/LayoutLoading';
import React from 'react'
import { ProductPageLayoutProps } from './ProductPageLayout';
import dynamic from 'next/dynamic';

const CoursePageLayout = dynamic(() => import("./ProductPageLayout"), {
    ssr: false,
    loading: () => <LayoutLoading color />,
  });
  export default function ProductPageClient(props: ProductPageLayoutProps) {
    return (
        <CoursePageLayout {...props} />
    );
  }