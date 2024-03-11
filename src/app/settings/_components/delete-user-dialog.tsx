'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useMutation } from '@tanstack/react-query';
import { IoIosArrowRoundBack } from 'react-icons/io';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogCancel,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { DefaultLoader } from '@/components/shared/loader';
import { CustomTooltip } from '@/components/shared/custom-tooltip';
import { deleteUserSettings } from '@/server/actions/settings/delete-user-settings.action';

import { useSettingsWidget } from '../_context/widgets.context';

export function DeleteUserDialog({
  data,
}: {
  data: IAPIResponses.iProfileItem;
}) {
  const { handleDeleteRow } = useSettingsWidget();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['delete-hotel'],
    mutationFn: () => deleteUserSettings(data.id),
    onSuccess: () => {
      setIsDialogOpen(false);
      toast({ title: 'Profile deleted' });
      handleDeleteRow();
    },
  });

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <CustomTooltip content="Delete Hotel">
        <AlertDialogTrigger className="w-[45px] h-[45px] rounded-full grid place-items-center bg-[#F6F6F6]">
          <Image
            src="/vectors/trash-icon.svg"
            alt="Trash Icon"
            width={20}
            height={20}
          />
        </AlertDialogTrigger>
      </CustomTooltip>
      <AlertDialogContent className="w-screen max-w-[466px] rounded-[30px] p-[30px] bg-[#EFEFF9] space-y-[25px]">
        <header className="w-full flex items-center justify-between">
          <button
            className="w-[38px] h-[38px] rounded-full grid place-items-center bg-white"
            onClick={() => setIsDialogOpen(false)}
          >
            <IoIosArrowRoundBack />
          </button>
          <h2 className="font-normal text-base">Delete Hotel Confirmation</h2>
          <div className="w-[38px] h-[38px]" />
        </header>
        <AlertDialogTitle className="text-center font-normal">
          Are you sure you want to delete the hotel details?
        </AlertDialogTitle>
        <div className="flex items-center w-full gap-[18px]">
          <AlertDialogCancel className="flex-[1] min-h-[50px]">
            Cancel
          </AlertDialogCancel>
          <Button
            className="flex-[1] min-h-[50px]"
            disabled={isPending}
            onClick={() => mutateAsync()}
          >
            {isPending ? <DefaultLoader /> : 'Delete'}
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
