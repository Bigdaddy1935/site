'use client';
import React, { useEffect } from 'react';
import { Controller, FieldValues, RegisterOptions, useFormContext } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';
import TextInput from './TextInput';

type Props = {
  name: string;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
      >
    | undefined;
  label?: string;
  defaultValue?: string;
  row?: boolean;
  wrapperClassName?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;
export default function TextField(props: Props) {
  const {
    name,
    rules,
    required,
    label,
    defaultValue,
    className,
    wrapperClassName,
    row,
    ...allProps
  } = props;
  const { setValue, control, watch } = useFormContext();

  useEffect(() => {
    setValue(name, defaultValue);
  }, [defaultValue]);
  return (
    <Controller
      name={name}
      rules={{
        ...rules,
        ...(required ? { required: `ورود فیلد ${label ?? 'فوق'} الزامی است` } : null),
        ...(props.type === 'password'
          ? { minLength: { value: 8, message: `فیلد ${label ?? 'فوق'} باید حداقل 8 کاراکتر باشد` } }
          : null),
        ...(props.type === 'password' && name === 'confirm-password'
          ? {
              validate: (value) =>
                value === watch('password') || 'رمز عبور و تکرار آن با یکدیگر مطابقت ندارند.'
            }
          : null)
      }}
      render={({ field: { ref, ...allField }, fieldState: { error } }) => (
        <div
          className={twMerge(
            `flex ${row ? 'items-center justify-center' : 'flex-col items-stretch'} mb-2 w-full gap-1 lg:mb-6 lg:min-w-[365px] lg:flex-row  lg:items-center lg:gap-3`,
            wrapperClassName
          )}
        >
          {label ? (
            <label className="font-noraml text-base text-hgray-600 dark:text-text-dark-5 lg:min-w-[80px]">{label}</label>
          ) : null}
          <div className={`${!row && 'flex-1'} relative`}>
            <TextInput field={allField} {...{ className, ...allProps }} />
            <p className="absolute -bottom-4 right-0 text-xs font-medium text-rose-700">
              {error ? error.message : ''}
            </p>
          </div>
        </div>
      )}
    />
  );
}
