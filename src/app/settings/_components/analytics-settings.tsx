'use client';

import { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { DefaultLoader } from '@/components/shared/loader';
import { TimeButton } from '@/components/shared/time-button';
import type {
  iAnalyticSettingsResponse,
  iSaveAnalyticSettingsPayload,
} from '@/server/actions/settings/settings.types';

import { ScrappingFrequency } from './scrapping-frequency';

export function AnalyticsSettings({
  data,
}: {
  data: Maybe<iAnalyticSettingsResponse>;
}) {
  const [wasEdited, setWasEdited] = useState(false);

  const form = useForm<iSaveAnalyticSettingsPayload>();

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ['create-analytics-settings'],
    mutationFn: async (payload: iSaveAnalyticSettingsPayload) => {
      const { saveAnalyticSettings } = await import(
        '@/server/actions/settings/analytics-settings.actions'
      );

      return saveAnalyticSettings(payload, data?.id);
    },
    onSuccess: () => toast({ title: 'Analytics Settings created!' }),
  });

  return (
    <div className="w-full rounded-[25px] px-2 py-4 flex-[1] section-bg flex flex-col gap-6">
      <h2 className="text-base font-medium ml-3">Analytics Setting</h2>
      <Form {...form}>
        <form
          className="w-full rounded-[24px] bg-white py-6 px-2.5 min-h-[107px] flex-[1] flex items-center justify-between flex-wrap gap-[93px]"
          onSubmit={form.handleSubmit((data) => mutateAsync(data))}
        >
          <div className="flex items-center gap-10 max-md:flex-wrap">
            <Controller
              name="start_time"
              control={form.control}
              defaultValue={data?.start_time}
              render={({ field }) => (
                <TimeButton
                  label="Start Time"
                  defaultHour={data?.start_time}
                  onSelectHour={(time) => {
                    field.onChange(time);
                    setWasEdited(true);
                  }}
                />
              )}
            />
            <Controller
              control={form.control}
              name="end_time"
              defaultValue={data?.end_time}
              render={({ field }) => (
                <TimeButton
                  label="End Time"
                  defaultHour={data?.end_time}
                  onSelectHour={(time) => {
                    field.onChange(time);
                    setWasEdited(true);
                  }}
                />
              )}
            />
            <Controller
              control={form.control}
              name="frequency"
              defaultValue={data?.frequency}
              render={({ field }) => (
                <ScrappingFrequency
                  onSelectFrequency={({ hour, minutes }) => {
                    const minutesByHour = hour * 60;

                    const value = `${minutesByHour + minutes}`;

                    field.onChange(value);
                    setWasEdited(true);
                  }}
                  defaultFrequency={field.value}
                />
              )}
            />
          </div>
          <Button
            className="w-full max-w-[155px] h-[50px] font-light"
            disabled={isPending || !wasEdited}
          >
            {isPending ? <DefaultLoader /> : 'Update'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
