import clsx from 'clsx';
import React from 'react';

type Props = {
  level?: number;
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
export default function BoxComment(props: Props) {
  const { children, className, level = 1, ...allProps } = props;
  const levelStyle =
    level === 1 ? 'bg-hgray-200 dark:bg-mdark-400' : 'bg-hgray-100 dark:bg-mdark-600';
  return (
    <div className={clsx(className , 'rounded-lg p-3.5', levelStyle)} {...allProps}>
      {children}
    </div>
  );
}
