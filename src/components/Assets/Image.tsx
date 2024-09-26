import { imageLoaderData } from '@/constant/imageLoaderData';
import NextImage from 'next/image';
import { ComponentProps } from 'react';

export default function Image(props: ComponentProps<typeof NextImage>) {
  return <NextImage {...props} placeholder={imageLoaderData}  />;
}
