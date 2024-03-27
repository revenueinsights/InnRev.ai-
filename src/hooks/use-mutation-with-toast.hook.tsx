'use client';

import {
  type DefaultError,
  useMutation,
  type UseMutationOptions,
} from '@tanstack/react-query';

import { useToast } from '@/components/ui/use-toast';
import { isNullableValue } from '@/utils/is-nullable-value.util';
import { ToastAction, type ToastActionElement } from '@/components/ui/toast';

export function useMutationWithToast<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown
>({
  toastCustomError,
  toastAction,
  ...options
}: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'onError'> & {
  toastCustomError?: string;
  toastAction?: ToastActionElement;
}) {
  const { toast } = useToast();

  const mutationResult = useMutation({
    ...options,
    onError: (error, variables) => {
      toast({
        title: toastCustomError || 'Something went wrong',
        variant: 'destructive',
        description:
          !isNullableValue(error) &&
          typeof error === 'object' &&
          'message' in error! ? (
            String(error.message)
          ) : (
            <pre>{JSON.stringify(error)}</pre>
          ),
        action: toastAction ?? (
          <ToastAction
            altText="Try again"
            onClick={() => mutationResult.reset()}
          >
            Try again
          </ToastAction>
        ),
      });

      console.log(variables);

      return Promise.reject(error);
    },
  });

  return mutationResult;
}
