import axios from 'axios';

import { auth } from '@/lib/auth.lib';
import { toast } from '@/components/ui/use-toast';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

api.interceptors.request.use(
  async (req) => {
    const access_token = (await auth()).access_token;

    if (access_token) {
      req.headers.Authorization = `Bearer ${access_token}`;
    }

    return Promise.resolve(req);
  },
  (err) => {
    console.log(err);
    toast({
      title: 'Something went wrong',
      variant: 'destructive',
      description: `Error: ${err.message}`,
    });

    return Promise.reject(err);
  }
);

export { api };
