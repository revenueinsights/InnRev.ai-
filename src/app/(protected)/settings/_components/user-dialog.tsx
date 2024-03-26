'use client';

import { z } from 'zod';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { DefaultLoader } from '@/components/shared/loader';
import type {
  iCreateHotelSettingsPayload,
  iEditHotelSettingsPayload,
} from '@/server/actions/settings/settings.types';

type HotelDialogProps = WithChildren<
  { mode: 'edit'; data: IAPIResponses.iProfileItem } | { mode: 'create' }
>;

export function InputRow({ children }: WithChildren) {
  return (
    <div className="w-full flex items-center gap-3 max-md:flex-col">
      {children}
    </div>
  );
}

const stringSchema = z.string();
const optionalStringSchema = stringSchema.optional();
const optionalUrlStringSchema = optionalStringSchema.refine(
  (value) => {
    if (value) {
      return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i.test(value);
    }
    return true;
  },
  {
    message: 'Invalid URL format',
  }
);

export function UserDialog(props: HotelDialogProps) {
  const isEditMode: boolean = useMemo(() => props.mode === 'edit', [props]);

  const defaultValues = useMemo(() => {
    if (isEditMode && 'data' in props) {
      const data = props.data as IAPIResponses.iProfileItem;

      const hotelsData = data.hotels.sort((a, b) => a.id - b.id);

      return {
        profileName: data.profileName,
        hotel_name1: hotelsData[0]?.hotelName,
        hotel_url1: hotelsData[0]?.hotelUrl,
        hotel_name2: hotelsData[1]?.hotelName,
        hotel_url2: hotelsData[1]?.hotelUrl,
        hotel_name3: hotelsData[2]?.hotelName,
        hotel_url3: hotelsData[2]?.hotelUrl,
        hotel_name4: hotelsData[3]?.hotelName,
        hotel_url4: hotelsData[3]?.hotelUrl,
      };
    }
    return undefined;
  }, [props, isEditMode]);

  const userDialogSchema = z
    .object({
      profileName: isEditMode ? optionalStringSchema : stringSchema,
      hotel_name1: optionalStringSchema,
      hotel_url1: optionalUrlStringSchema,
      hotel_name2: optionalStringSchema,
      hotel_url2: optionalUrlStringSchema,
      hotel_name3: optionalStringSchema,
      hotel_url3: optionalUrlStringSchema,
      hotel_name4: optionalStringSchema,
      hotel_url4: optionalUrlStringSchema,
    })
    .refine(
      (data) => {
        const sets = [
          ['hotel_name1', 'hotel_url1'],
          ['hotel_name2', 'hotel_url2'],
          ['hotel_name3', 'hotel_url3'],
          ['hotel_name4', 'hotel_url4'],
        ];

        return sets.some(
          // @ts-ignore
          ([nameKey, urlKey]) => !!data[nameKey!] && !!data[urlKey!]
        );
      },
      {
        message:
          'At least one set of hotel_name and hotel_url should be filled.',
        path: ['hotel_name1'],
      }
    );

  type UserFormType = z.infer<typeof userDialogSchema>;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<UserFormType>({
    resolver: zodResolver(userDialogSchema),
    defaultValues,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [props.mode === 'create' ? 'create-hotel' : 'edit-hotel'],
    mutationFn: async (data: UserFormType) => {
      if (isEditMode && 'data' in props) {
        const { editUserSettings } = await import(
          '@/server/actions/settings/edit-user-settings.action'
        );

        const propsData = props.data as IAPIResponses.iProfileItem;

        const editPayload: iEditHotelSettingsPayload = {
          profileName: data.profileName,
          hotel_id1: propsData.hotels[0]?.id,
          hotel_name1: data.hotel_name1,
          hotel_url1: data.hotel_url1,
          hotel_id2: propsData.hotels[1]?.id,
          hotel_name2: data.hotel_name2,
          hotel_url2: data.hotel_url2,
          hotel_id3: propsData.hotels[2]?.id,
          hotel_name3: data.hotel_name3,
          hotel_url3: data.hotel_url3,
          hotel_id4: propsData.hotels[3]?.id,
          hotel_name4: data.hotel_name4,
          hotel_url4: data.hotel_name4,
        };

        return editUserSettings(editPayload, propsData.id);
      }

      const { createUserSettings } = await import(
        '@/server/actions/settings/create-user-settings.action'
      );

      return createUserSettings(data as iCreateHotelSettingsPayload);
    },
    onSuccess: () => {
      setIsDialogOpen(false);

      toast({
        title: props.mode === 'create' ? 'Hotel Created!' : 'Hotel Edited',
      });
    },
    onError: (err) => {
      return toast({
        title: 'Something went wrong',
        description: err.message,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = useCallback(
    async (payload: UserFormType) => {
      await mutateAsync(payload);
    },
    [mutateAsync]
  );

  useEffect(() => {
    if (props.mode === 'create') {
      form.reset();
    }
  }, [isDialogOpen, props.mode, form]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent
        className="m-2 w-screen max-w-[466px] bg-[#EFEFF9] space-y-[25px] rounded-[30px] p-[30px]"
        disableCloseButton
      >
        <header className="w-full flex justify-between items-center">
          <DialogClose className="w-[38px] h-[38px] rounded-full grid place-items-center bg-white">
            <IoIosArrowRoundBack />
          </DialogClose>
          <h2 className="font-normal text-base">
            {isEditMode ? 'Edit User Details' : 'New User Details'}
          </h2>
          <div className="w-[38px] h-[38px]" />
        </header>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-[27px]"
          >
            <FormField
              name="profileName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change name of your hotel</FormLabel>
                  <Input placeholder="Hotel Name" autoFocus {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <InputRow>
              <FormField
                name="hotel_name1"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change name of your hotel 1</FormLabel>
                    <Input placeholder="Hotel Name 1" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hotel_url1"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change name of your hotel</FormLabel>
                    <Input placeholder="Hotel Url 1" type="url" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </InputRow>
            <InputRow>
              <FormField
                name="hotel_name2"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change name of your hotel 2</FormLabel>
                    <Input placeholder="Hotel Name 2" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hotel_url2"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change name of your hotel</FormLabel>
                    <Input placeholder="Hotel Url 2" type="url" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </InputRow>
            <InputRow>
              <FormField
                name="hotel_name3"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change name of your hotel 3</FormLabel>
                    <Input placeholder="Hotel Name 3" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hotel_url3"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change name of your hotel</FormLabel>
                    <Input placeholder="Hotel Url 3" type="url" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </InputRow>
            <InputRow>
              <FormField
                name="hotel_name4"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change name of your hotel 4</FormLabel>
                    <Input placeholder="Hotel Name 4" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="hotel_url4"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Change name of your hotel</FormLabel>
                    <Input placeholder="Hotel Url 4" type="url" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </InputRow>
            <div className="w-full flex items-center gap-[18px]">
              <Button
                variant="outline"
                type="button"
                className="flex-[1] min-h-[50px]"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                className="flex-[1] min-h-[50px]"
                disabled={isPending}
              >
                {isPending ? (
                  <DefaultLoader />
                ) : isEditMode ? (
                  'Save Changes'
                ) : (
                  'Create'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
