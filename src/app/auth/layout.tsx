import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth.lib';

export default async function AuthLayout({ children }: WithChildren) {
  const { access_token, user } = await auth();

  if (access_token || user) {
    return redirect('/');
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-2">
      <div className="bg-white p-4 rounded-xl w-full max-w-[600px] flex items-center justify-center flex-col gap-3">
        {children}
      </div>
    </div>
  );
}
