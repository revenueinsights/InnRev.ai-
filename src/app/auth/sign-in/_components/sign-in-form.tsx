/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DefaultLoader } from '@/components/shared/loader';
import { signIn } from '@/server/actions/auth/sign-in.action';
import { PasswordInput } from '@/components/ui/password-input';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  type SignInFormType,
  signInFormSchema,
} from '../../_schemas/sign-in-form.schema';

export function SignInForm() {
  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInFormSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: SignInFormType) => signIn(data),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="flex flex-col gap-3 items-center w-full"
      >
        <FormField
          name="user_email"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="email">Enter your email</FormLabel>
              <Input
                placeholder="Your email"
                type="email"
                autoFocus
                id="email"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="password">Enter your password</FormLabel>
              <PasswordInput
                placeholder="Your password"
                id="password"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? <DefaultLoader /> : 'Sign In'}
        </Button>
      </form>
      <Link href="/auth/sign-up" className="text-[#8A85FF] self-end">
        Don't have an account ? Click here.
      </Link>
    </Form>
  );
}
