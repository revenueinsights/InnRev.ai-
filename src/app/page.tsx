import { getHotelsData } from '@/server/actions/home/get-hotels-data.action';

import { HotelsOverview } from './_components/home/hotels-overview';
import { YourOverView } from './_components/home/your-overview';
import { AdrWidget } from './_components/home/adr-widget';
import { FileProvider } from './_context/file.context';

export default async function Home({
  searchParams,
}: ServerComponentPageProps<{}, { 'profile-id'?: string }>) {
  const data = await getHotelsData(searchParams['profile-id']);

  if (!data) {
    return <h2>No data to show!</h2>;
  }

  const {
    response: { comp_statistics, initialResponse, my_statistics },
    profilesResponse,
    currentProfile,
  } = data;

  return (
    <div className="w-full flex flex-col gap-3">
      <FileProvider>
        <HotelsOverview
          data={initialResponse}
          profiles={profilesResponse}
          selectedProfileId={
            searchParams['profile-id'] || currentProfile?.id.toString()
          }
        />
        <div className="w-full flex items-center gap-[9px]">
          <YourOverView
            comp_statistics={comp_statistics}
            my_statitics={my_statistics}
          />
          <AdrWidget data={initialResponse} />
        </div>
      </FileProvider>
    </div>
  );
}
