'use client';

import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';

import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
} from '@/components/ui/select';
import { cn } from '@/utils/cn.util';

interface iDropdownFieldProps<T, K = keyof T> {
  value?: string | number | Date;
  onChange?: (value: string) => VoidReturn;
  options: T[];
  labelAccessor: K;
  valueAccessor: K;
  hideChevronIndicator?: boolean;
  dropdownMenuLabel?: string;
  dropdownTriggerLabel?: string;
  disabled?: boolean;
}

export function DropdownField<T>({
  labelAccessor,
  options,
  valueAccessor,
  onChange,
  value,
  hideChevronIndicator,
  dropdownMenuLabel,
  dropdownTriggerLabel,
  disabled,
}: iDropdownFieldProps<T>) {
  const defaultOption = useMemo(() => {
    if (value) {
      const foundedOption = options.find(
        (option) => option[valueAccessor] == value
      );

      if (!foundedOption) return undefined;

      return {
        label: String(foundedOption[labelAccessor]),
        value: String(foundedOption[valueAccessor]),
      };
    }
  }, [labelAccessor, options, value, valueAccessor]);

  return (
    <Select onValueChange={onChange} defaultValue={defaultOption?.value}>
      <SelectTrigger
        hideChevronIcon
        disabled={disabled}
        className={cn(
          !hideChevronIndicator && 'inline-flex items-center gap-0.5',
          'p-1.5 text-sm bg-transparent border-none'
        )}
      >
        {defaultOption?.value ? (
          <span>{defaultOption.label}</span>
        ) : (
          <SelectValue
            placeholder={
              defaultOption?.label || dropdownTriggerLabel || 'Select'
            }
          />
        )}
        {hideChevronIndicator ? null : <ChevronDown className="w-3.5 h-3.5" />}
      </SelectTrigger>
      <SelectContent align="center" className="w-full">
        {dropdownMenuLabel ? (
          <SelectGroup>
            <SelectLabel>{dropdownMenuLabel}</SelectLabel>
            <SelectSeparator />
          </SelectGroup>
        ) : null}
        {options.map((option, key) => {
          const value = option[valueAccessor];
          const label = option[labelAccessor];

          return (
            <SelectItem
              key={key}
              className="w-full cursor-pointer text-left"
              value={String(value)}
            >
              {label?.toString().trim()}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
