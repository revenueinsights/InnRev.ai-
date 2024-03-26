'use client';

import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { createContext, useCallback, useContext } from 'react';

import { toast } from '@/components/ui/use-toast';
import { CustomLoader } from '@/components/shared/loader';
import { uploadCSVFile } from '@/server/actions/home/upload-csv-file.action';

type FileUploadResponse = Awaited<ReturnType<typeof uploadCSVFile>>;

interface iFileContextProps {
  handleFileUpload: (payload: File) => Promise<void>;
  fileUploadResponse: FileUploadResponse;
  resetFileImport: () => void;
}

const FileContext = createContext<iFileContextProps | undefined>(undefined);

export function FileProvider({ children }: WithChildren) {
  const {
    isPending,
    mutateAsync,
    data: fileUploadResponse,
    reset: resetFileImport,
  } = useMutation({
    mutationKey: ['upload-file'],
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append('file', file);

      const response = await axios.post('/api/upload-csv-file', formData);

      console.log(response.data);

      return Promise.resolve(response.data as FileUploadResponse);
    },
    onSuccess: () =>
      toast({
        title: 'File Imported!',
      }),
    onError: (err) =>
      toast({
        title: 'Something went wrong',
        content: `Message: ${err.message}, Cause: ${err.cause}`,
        variant: 'destructive',
      }),
  });

  const handleFileUpload = useCallback(
    async (file: File) => {
      await mutateAsync(file);
    },
    [mutateAsync]
  );

  return (
    <FileContext.Provider
      value={{ handleFileUpload, fileUploadResponse, resetFileImport }}
    >
      {children}
      {isPending ? (
        <div
          className="w-svw h-screen absolute top-0 left-0 z-50"
          style={{ background: 'rgba(255, 255, 255, 0.5)' }}
        >
          <CustomLoader text="Importing file. This might take a few secounds" />
        </div>
      ) : null}
    </FileContext.Provider>
  );
}

export function useFileContext() {
  const context = useContext(FileContext);

  if (!context) {
    throw new Error('Error');
  }

  return context;
}
