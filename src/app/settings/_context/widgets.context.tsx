'use client';

import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { useQuery } from '@tanstack/react-query';

import { getHotelsRooms } from '@/server/actions/settings/get-hotel-rooms.action';
import { isNullableValue } from '@/utils/is-nullable-value.util';

export const WidgetsContext = createContext<
  Maybe<{
    selectedRow: Maybe<IAPIResponses.iProfileItem>;
    onSelectRow: (row: IAPIResponses.iProfileItem) => void;
    rooms: IAPIResponses.iRoomsResponse[] | undefined;
    setCurrentHotelId: Dispatch<SetStateAction<number | undefined>>;
    isLoadingRooms?: boolean;
    currentHotelId: number | undefined;
    handleDeleteRow: () => void;
  }>
>(null);

export function WidgetsProvider({ children }: WithChildren) {
  const [selectedRow, setSelectedRow] =
    useState<Maybe<IAPIResponses.iProfileItem>>(null);

  const [currentHotelId, setCurrentHotelId] = useState<number>();

  const { data: rooms, isLoading } = useQuery({
    queryKey: ['get-rooms', currentHotelId || ''],
    queryFn: async () => {
      if (isNullableValue(currentHotelId)) return;

      return getHotelsRooms(currentHotelId);
    },
    refetchOnReconnect: true,
  });

  const handleSelectRow = useCallback(
    (row: IAPIResponses.iFormatedProfileItem) => {
      setSelectedRow((prev) => {
        if (prev && prev.id === row.id) {
          return prev;
        }

        setCurrentHotelId(row.firstHotel?.id);

        return row;
      });
    },
    [setSelectedRow]
  );

  const handleDeleteRow = useCallback(() => {
    setSelectedRow(undefined);
    setCurrentHotelId(undefined);
  }, []);

  return (
    <WidgetsContext.Provider
      value={{
        onSelectRow: handleSelectRow,
        selectedRow,
        setCurrentHotelId,
        rooms,
        isLoadingRooms: isLoading,
        currentHotelId,
        handleDeleteRow,
      }}
    >
      {children}
    </WidgetsContext.Provider>
  );
}

export function useSettingsWidget() {
  const context = useContext(WidgetsContext);

  if (!context) {
    throw new Error('Invalid usage of hook');
  }

  return context;
}
