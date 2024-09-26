'use client';
import { toPersianDateFormat } from '@/lib/toPersianDateFormat';
import { useState } from 'react';
import { GalleryItem } from '@/types/';
import GalleryImageItem from './GalleryImageItem';
import GallerySlider from './GallerySlider';

export default function GalleyItem(props: GalleryItem) {
  const [open, setOpen] = useState<number | null>(null);
  const { updated_at, name, libraries } = props;
  return (
    <div className="flex gap-6">
      {!!open && (
        <GallerySlider title={name} items={libraries} open={open} onClose={() => setOpen(null)} />
      )}
      <p className="hidden min-w-[135px] flex-1 text-base text-hgray-400 lg:flex">
        {toPersianDateFormat(updated_at)}
      </p>

      <div>
        <p className="mb-4 flex justify-between text-lg font-semibold text-hgray-500">
          {name}
          <span className="text-base text-hgray-400 lg:hidden">
            {toPersianDateFormat(updated_at)}
          </span>
        </p>

        <div className="flex flex-wrap max-lg:justify-between lg:gap-x-6 gap-y-10">
          {libraries.map((item, index) => (
            <GalleryImageItem {...item} onClick={() => setOpen(index)} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
