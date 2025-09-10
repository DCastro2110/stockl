'use client';

import { ColumnDef } from '@tanstack/react-table';
import clsx from 'clsx';
import { CircleIcon } from 'lucide-react';

import { Product } from '@/../generated/prisma';
import { Badge } from '@/app/_components/ui/badge';

import OptionsDropdown from './options-dropdown';
import {
  IProductDTO,
  TProductStatus,
} from '@/app/_data-access/products/get-products';

function getStatus(status: TProductStatus) {
  switch (status) {
    case 'IN_STOCK':
      return 'Em estoque';
    case 'OUT_OF_STOCK':
      return 'Fora de estoque';
  }
}
export const columns: ColumnDef<IProductDTO>[] = [
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
      const product = row.original as IProductDTO;
      const bagdeStyle = clsx(
        'w-40 p-2',
        product.status === 'IN_STOCK'
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
      const product = row.original as IProductDTO;
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
