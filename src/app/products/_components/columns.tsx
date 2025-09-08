'use client';

import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { CircleIcon } from 'lucide-react';

import { Product } from '@/../generated/prisma';
import { Badge } from '@/app/_components/ui/badge';

import OptionsDropdown from './options-dropdown';

export type TProduct = Omit<Product, 'price'> & {
  price: number;
};

function getStatus(status: string) {
  switch (status) {
    case 'inactive':
      return 'Inativo';
    case 'active':
      return 'Ativo';
    case 'out_of_stock':
      return 'Fora de estoque';
  }
}
export const columns: ColumnDef<TProduct>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'stock',
    header: 'Quantidade',
  },
  {
    accessorKey: 'price',
    header: 'Valor unitário',
    cell: ({ row }) => {
      const { price } = row.original;
      return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(price));
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const product = row.original as TProduct;
      const bagdeStyle = clsx(
        'w-40 p-2',
        product.status === 'active'
          ? 'bg-green-400 fill-green-600'
          : 'bg-red-400 fill-red-600'
      );
      return (
        <Badge className={bagdeStyle}>
          <CircleIcon className='fill-inherit text-transparent' />
          {getStatus(product.status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'options',
    header: 'Opções',
    cell: ({ row }) => {
      const product = row.original as TProduct;
      return (
        <OptionsDropdown
          product={{
            name: product.name,
            status: product.status,
            price: product.price,
            stock: product.stock,
            id: product.id,
          }}
        />
      );
    },
  },
];
