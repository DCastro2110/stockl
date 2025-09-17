import { SetUserInfo } from '../_components/common/set-user-info';
import Sidebar from '../_components/sidebar';
import { Toaster } from '../_components/ui/sonner';

export default async function PrivateRoutesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className='flex h-full gap-8'>
        <Sidebar />
        <main className='ml-[272px] w-full'>{children}</main>
        <Toaster />
      </div>
      <SetUserInfo />
    </>
  );
}
