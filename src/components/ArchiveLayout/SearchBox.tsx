'use client';

import { useEffect, useState } from 'react';
import { useFilters } from './FilterContext';
import { ArchivePage } from './types';
import TextInput from '../Form/TextField/TextInput';
import IconSearch from '../Icons/IconSearch';
import { modelStr } from '@/constant/constants';
import useQuerySearch from '@/hooks/useQuerySearch';

type Props = {
  pageType: ArchivePage;
};

export default function SearchBox({ pageType }: Props) {
  const { search, teacher } = useQuerySearch(false);
  const { filters, handleSetFilters } = useFilters();
  const [term, setTerm] = useState(search);
  useEffect(() => {
    const handler = setTimeout(() => {
      if (term || filters.search) handleSetFilters({ search: term, teacher });
    }, 300);

    return () => clearTimeout(handler);
  }, [term]);
  return (
    <div className="relative">
      <TextInput
        className="dark:bg-mdark-400"
        onChange={(e) => setTerm(e.target.value)}
        value={term ?? ''}
        placeholder={`جستجو در بین ${modelStr[pageType]?.sum}`}
      />

      <IconSearch
        width={24}
        height={24}
        className="absolute left-2 top-2 text-primary-400 dark:text-primary-100"
      />
    </div>
  );
}
