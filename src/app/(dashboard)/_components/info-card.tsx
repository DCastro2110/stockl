import React from 'react';

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
  <div className='flex flex-col rounded-2xl border bg-white p-6 shadow-sm'>
    {children}
  </div>
);
