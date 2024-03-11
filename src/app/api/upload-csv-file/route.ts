'use server';

import { uploadCSVFile } from '@/server/actions/home/upload-csv-file.action';

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const fileData = formData.get('file') as File;

    const response = await uploadCSVFile(fileData);

    return Response.json(response);
  } catch (error) {
    return Response.error();
  }
}
