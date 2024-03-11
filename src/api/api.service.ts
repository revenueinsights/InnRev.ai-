import axios from 'axios';

import { toast } from '@/components/ui/use-toast';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

api.interceptors.request.use(
  (req) => {
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
