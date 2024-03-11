import { z } from 'zod';

import { ListWidget } from './_components/list-widget';
import { CalendarWidget } from './_components/calendar-widget';

const searchParamSchema = z.object({
  type: z
    .union([z.literal('calendar'), z.literal('list')])
    .optional()
    .default('calendar'),
});

export default async function CalendarPage({
  searchParams,
}: ServerComponentPageProps) {
  const typeResponse = searchParamSchema.safeParse(searchParams);

  if (!typeResponse.success) {
    return <h2>Invalid type!</h2>;
  }

  return typeResponse.data.type === 'calendar' ? (
    <CalendarWidget />
  ) : (
    <ListWidget />
  );
}
