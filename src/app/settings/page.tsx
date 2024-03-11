import { Suspense } from 'react';

import { getHotelsSettings } from '@/server/actions/settings/get-hotels-settings.action';
import { getAnalyticSettings } from '@/server/actions/settings/analytics-settings.actions';

import { RoomsWidget } from './_components/rooms-widget';
import { HotelsWidget } from './_components/hotels-widget';
import { AnalyticsSettings } from './_components/analytics-settings';
import { WidgetsProvider } from './_context/widgets.context';

export default async function SettingsPage({
  searchParams: { query },
}: ServerComponentPageProps<{}, { query?: string }>) {
  const [profileRes, analyticSettings] = await Promise.all([
    getHotelsSettings(query),
    getAnalyticSettings(),
  ]);

  return (
    <div className="settings-container grid grid-rows-[1fr,3fr]">
      <WidgetsProvider>
        <div className="w-full flex items-center gap-[11px]">
          <Suspense>
            <HotelsWidget data={profileRes} />
            <RoomsWidget />
          </Suspense>
        </div>
      </WidgetsProvider>
      <Suspense>
        <AnalyticsSettings data={analyticSettings} />
      </Suspense>
    </div>
  );
}
