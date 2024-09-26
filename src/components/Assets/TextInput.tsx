import clsx from 'clsx';
import React from 'react';

type Props = {
  fullWidth ?: boolean
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
export default function TextInput(props: Props) {
    const { fullWidth ,  className , ...allProps } = props;
    return (
        <input 
          {...allProps}
          className={clsx('bg-hgray-100 border border-solid border-hgray-300 rounded-md' , fullWidth && 'w-full',className)}
        />
    )
}
