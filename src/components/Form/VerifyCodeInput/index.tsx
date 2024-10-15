'use client';

import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react';

type Props = {
  length?: number;
  setValue: (s: string) => void;
};

export default function VerifyCodeInput({ length = 5, setValue }: Props) {
  const [code, setCode] = useState(Array(length).fill(''));

  const inputRefs = Array(length)
    .fill(0)
    .map((i) => useRef<any>());

  const onComplete = (str: string) => {
    setValue(str);
  };

  const handleInputChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length === 1 && !isNaN(Number(value))) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the next input field if available
      if (index < length - 1 && value !== '') {
        inputRefs[index + 1]?.current.focus();
      }

      // Check if all fields are filled
      if (newCode.every((val) => val !== '')) {
        const verificationCode = newCode.join('');
        onComplete(verificationCode);
      }
    } else if (value.length === 0) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // Move to the previous input field if available
      if (index > 0) {
        inputRefs[index - 1]?.current.focus();
      }
    }
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs[index - 1]?.current.focus();
    }
  };

  return (
    <div style={{ direction: 'ltr' }} className="flex  w-full justify-between gap-[6%]">
      {[...Array(length)].map((_, index) => (
        <input
          type="number"
          key={index}
          maxLength={1}
          value={code[index]}
          onChange={(e) => handleInputChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={inputRefs[index]}
          className="appearance-none outline-0 h-[64px] w-[54px] flex-1 rounded-lg border-2 border-solid border-primary-100 text-center text-xl text-hgray-400 dark:border-mdark-600 dark:bg-mdark-400 dark:text-text-dark-2"
        />
      ))}
    </div>
  );
}
