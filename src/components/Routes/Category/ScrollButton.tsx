'use client';
import Button, { ButtonProps } from '@/components/Assets/Button';

type Props = {
  label: string;
  color?: string;
  sectionId: string;
} & Omit<ButtonProps, 'color'>;

export default function ScrollButton({ label, color, sectionId }: Props) {
  const className = `bg-[${color}]`;

  const handleScroll = () => {
    const element = document.getElementById(sectionId);

    if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
  };
  return (
    <Button
      onClick={handleScroll}
      style={{}}
      className={`lg:ml-3 bg-transparent font-medium text-hgray-600 dark:text-text-dark-1 hover:text-primary-300 transition-colors`}
    >
      {label}
    </Button>
  );
}
