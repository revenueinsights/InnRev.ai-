'use client';

import { type ClassValue } from 'clsx';
import { type TooltipContentProps } from '@radix-ui/react-tooltip';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/utils/cn.util';

interface iCustomTooltipProps {
  content: string;
  toolTipTriggerClassName?: ClassValue;
  align?: TooltipContentProps['align'];
}

export function CustomTooltip({
  children,
  content,
  toolTipTriggerClassName,
  align = 'center',
}: WithChildren<iCustomTooltipProps>) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger className={cn('transition-all', toolTipTriggerClassName)}>
          {children}
        </TooltipTrigger>
        <TooltipContent className="dark:bg-[#0d0d0d]" align={align}>
          <p className="dark:text-white">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
