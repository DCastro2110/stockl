'use client';

import { ReactNode } from 'react';

import { Button } from '../ui/button';

type THeaderProps = {
  subtitle: string;
  title: string;
  hasButton?: boolean;
  buttonIcon?: ReactNode;
  buttonText?: string;
};

export const Header = ({
  subtitle,
  title,
  hasButton = false,
}: THeaderProps) => {
  const isButtonWillRender = hasButton && title && subtitle;

  return (
    <header className='flex flex-col gap-2 px-2 py-4'>
      <h2 className='text-sm font-semibold text-green-500'>Produtos</h2>
      <div className='flex w-full items-center justify-between'>
        <h1 className='text-xl font-semibold'>Gestão de Produtos</h1>
        {isButtonWillRender && <Button>Oi</Button>}
      </div>
    </header>
  );
};
