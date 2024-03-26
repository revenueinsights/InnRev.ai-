/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DefaultLoader } from '@/components/shared/loader';
import { PasswordInput } from '@/components/ui/password-input';
import { signUp } from '@/server/actions/auth/sign-up.action';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import {
  type SignUpFormType,
  signUpFormSchema,
} from '../../_schemas/sign-up-form.schema';

export function SignUpForm() {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: SignUpFormType) => signUp(data),
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => mutate(data))}
        className="flex flex-col gap-3 items-center w-full"
      >
        <FormField
          name="user_name"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="user_name">Enter your user name</FormLabel>
              <Input
                placeholder="Your user name"
                autoFocus
                id="user_name"
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
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
        <FormField
          name="confirm_password"
          control={form.control}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor="confirm">Confirm your password</FormLabel>
              <PasswordInput
                placeholder="Your password"
                id="confirm"
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
      <Link href="/auth/sign-in" className="text-[#8A85FF] self-end">
        Already have an account ? Click here.
      </Link>
    </Form>
  );
}
