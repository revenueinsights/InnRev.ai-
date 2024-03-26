'use client';

import { useState } from 'react';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import { cn } from '@/utils/cn.util';

import { Input, type InputProps } from './input';

export function PasswordInput({
  className,
  ...rest
}: Omit<InputProps, 'type'>) {
  const [inputType, setInputType] = useState<'password' | 'text'>('password');

  return (
    <div className="relative flex items-center flex-[1]">
      <Input
        className={cn('pr-8 rounded-full', className)}
        type={inputType}
        {...rest}
      />
      <button
        className="absolute right-[4px] mr-2.5"
        type="button"
        onClick={() =>
          setInputType((prev) => (prev === 'password' ? 'text' : 'password'))
        }
      >
        {inputType === 'password' ? <IoEyeOffOutline /> : <IoEyeOutline />}
      </button>
    </div>
  );
}
