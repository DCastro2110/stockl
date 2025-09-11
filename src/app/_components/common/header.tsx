import { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface IHeaderProps {
  children: ReactNode;
  className?: string;
}

export const HeaderLeft = ({ children }: IHeaderProps) => (
  <div className='flex flex-col justify-center gap-4'>{children}</div>
);

export const HeaderRight = ({ children }: IHeaderProps) => (
  <div className='flex flex-col justify-center gap-4'>{children}</div>
);

export const HeaderTitle = ({ children }: IHeaderProps) => (
  <h1 className='text-xl font-semibold'>{children}</h1>
);

export const HeaderSubtitle = ({ children }: IHeaderProps) => (
  <span className='text-sm font-semibold text-green-500'>{children}</span>
);

export const Header = ({ children, className }: IHeaderProps) => {
  return (
    <header className={cn('flex justify-between gap-2 px-2 py-4', className)}>
      {children}
    </header>
  );
};
