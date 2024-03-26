'use client';

import { useCallback, useState } from 'react';

import { useSearchUrl } from '@/hooks/use-search-url.hook';
import { useFileContext } from '@/app/_context/file.context';
import type { iHotelData } from '@/server/actions/home/home.types';

export function useHotelsOverview(selectedProfileId?: string) {
  const { handleFileUpload, fileUploadResponse, resetFileImport } =
    useFileContext();

  const [currentFile, setCurrentFile] = useState<File>();
  const [selectedItems, setSelectedItems] = useState<Partial<iHotelData>[]>([]);

  const { handleSetSearchParam } = useSearchUrl(
    'profile-id',
    selectedProfileId
  );

  const handleSelectItem = useCallback(
    (item: iHotelData, key: keyof iHotelData) => {
      setSelectedItems((prev) => {
        const value = item[key];

        if (!prev.length) return [{ id: item.id, [key]: value }];

        const isThereSameItem = prev.find(
          (selectedItem) =>
            selectedItem.id === item.id && selectedItem[key] === value
        );

        if (isThereSameItem) {
          return prev
            .map((selectedItem) => {
              if (selectedItem.id !== item.id) return selectedItem;

              const updatedSelectedItem = { ...selectedItem };

              delete updatedSelectedItem[key];

              return updatedSelectedItem;
            })
            .filter(
              (updatedSelectedItem) =>
                Object.keys(updatedSelectedItem).length !== 1
            );
        }

        if (prev.some((prevItem) => prevItem.id === item.id)) {
          return prev.map((prevItem, _, arr) => {
            const hasSameIdInArray = arr.find(
              (arrItem) => arrItem.id === item.id
            );

            if (!hasSameIdInArray) {
              return { ...prevItem, [key]: value };
            }

            return prevItem.id === item.id
              ? { ...prevItem, [key]: value }
              : prevItem;
          });
        }

        return [{ id: item.id, [key]: value }, ...prev];
      });
    },
    [setSelectedItems]
  );

  return {
    handleFileUpload,
    currentFile,
    setCurrentFile,
    selectedItems,
    handleSetSearchParam,
    handleSelectItem,
    fileUploadResponse,
    resetFileImport,
  };
}
