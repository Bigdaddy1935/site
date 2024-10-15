'use client';
import ClientOnly from '@/components/Assets/ClientOnly';
import EmptyButton from '@/components/Assets/EmptyButton';
import IconDarkMode from '@/components/Icons/IconDarkMode';
import { useThemeSwitch } from '@/hooks/useThemeSwitch';

export default function DarkModeSwich() {
  const { mode, setMode } = useThemeSwitch();
  return (
    <EmptyButton
      onClick={() => (mode === 'dark' ? setMode('light') : setMode('dark'))}
      className="flex items-center p-2 text-hgray-600 dark:text-white lg:hover:text-primary-400"
    >
      <IconDarkMode width={22} height={22} />

      <span className="mr-4 text-base">
        <ClientOnly>{`حالت ${mode === 'dark' ? 'روز' : 'شب'}`}</ClientOnly>
      </span>
    </EmptyButton>
  );
}
