import type { IconBaseProps } from 'react-icons/lib';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import { cn } from '@/utils/cn.util';

export function DefaultLoader({ className, ...rest }: IconBaseProps) {
  return (
    <AiOutlineLoading3Quarters
      className={cn(
        'animate-spin fade-in-10 text-3xl transition-all',
        className
      )}
      {...rest}
    />
  );
}

export function CustomLoader({text}: { text?: string }) {
  return (
    <div className="loader">
      <div className="loader d-inline-block" />
      {text ? <span>{text}</span>:null}
    </div>
  );
}
