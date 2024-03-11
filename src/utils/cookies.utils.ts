import { cookies as nativeCookies } from 'next/headers';

export function cookies() {
  const instatidated = nativeCookies();

  return {
    getCookie: <T>(key: string) => instatidated.get(key) as T,
    setCookie: (key: string, value: any) =>
      instatidated.set(key, JSON.stringify(value)),
    deleteCookie: (key: string) => instatidated.delete(key),
  };
}
