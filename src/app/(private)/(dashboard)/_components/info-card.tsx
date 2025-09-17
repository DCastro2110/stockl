import React from 'react';

import { Skeleton } from '@/app/_components/ui/skeleton';

interface IInfoCardProps {
  children: React.ReactNode;
}

export const InfoCardIcon = ({ children }: IInfoCardProps) => (
  <div className='mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-green-200 text-green-500'>
    {children}
  </div>
);

export const InfoCardTitle = ({ children }: IInfoCardProps) => (
  <span className='text-sm font-medium text-gray-500'>{children}</span>
);

export const InfoCardValue = ({ children }: IInfoCardProps) => (
  <p className='text-2xl font-bold text-gray-900'>{children}</p>
);

export const InfoCard = ({ children }: IInfoCardProps) => (
  <div className='flex h-40 max-h-40 flex-col rounded-2xl border bg-white p-6 shadow-sm'>
    {children}
  </div>
);

export const InfoCardSkeleton = () => {
  return (
    <div className='flex max-h-40 flex-col gap-4 rounded-2xl border bg-white p-6 shadow-sm'>
      <Skeleton className='flex h-9 w-9 items-center justify-center rounded-lg' />
      <div className='space-y-2'>
        <Skeleton className='h-4 w-full max-w-72' />
        <Skeleton className='h-8 w-full max-w-72' />
      </div>
    </div>
  );
};
