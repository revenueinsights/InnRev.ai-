import { type ZodSchema, type ZodTypeDef, z } from 'zod';
import { type AxiosRequestConfig, type Method } from 'axios';

import { api } from '@/api/api.service';
import { toast } from '@/components/ui/use-toast';

interface iValidatedAPICallProps<
  TOutput = any,
  TDef extends ZodTypeDef = ZodTypeDef,
  TInput = TOutput
> extends Omit<
    AxiosRequestConfig<TOutput>,
    'method' | 'url' | 'data' | 'params'
  > {
  body?: any;
  method?: Method;
  endpoint: string;
  hideErrorMessage?: boolean;
  customToastErrorMessage?: string;
  zodSchema: ZodSchema<TOutput, TDef, TInput>;
  params?: Record<string, Maybe<string | number | Date>>;
}

export async function validateApiCall<T>({
  body,
  endpoint,
  params,
  method = 'GET',
  customToastErrorMessage,
  zodSchema,
  hideErrorMessage,
  ...rest
}: iValidatedAPICallProps<T>): Promise<T> {
  try {
    const response = await api.request({
      method,
      url: endpoint,
      data: body,
      params,
      headers: {
        ...rest.headers,
      },
      ...rest,
    });

    const responseParsedData = await zodSchema.parseAsync(response.data);

    return Promise.resolve(responseParsedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      toast({
        title: `API não respondeu da maneira esperada cheque o ENDPOINT: ${endpoint} com o método ${method}`,
        variant: 'destructive',
      });
    }

    return Promise.reject(error);
  }
}
