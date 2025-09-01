'use client';

import clsx from 'clsx';
import { LucideIcon, LucideProps } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { ReactElement, ReactNode } from 'react';

import { Button } from './ui/button';

interface ISidebarButtonProps {
  href: string;
  children: ReactNode;
}

export const SidebarButton = ({ href, children }: ISidebarButtonProps) => {
  const path = usePathname();
  const buttonClassName = clsx(
    'text-md justify-start gap-2',
    path === href && 'bg-slate-100'
  );

  return (
    <Button
      className={buttonClassName}
      variant='ghost'
      asChild
    >
      <Link href={href}>{children}</Link>
    </Button>
  );
};
