'use client';

import { ColumnDef, Row, SortingFn } from '@tanstack/react-table';
import clsx from 'clsx';
import { ArrowUpDown, CircleIcon } from 'lucide-react';

import { Badge } from '@/app/_components/ui/badge';
import { Button } from '@/app/_components/ui/button';
import {
  IProductDTO,
  TProductStatus,
} from '@/app/_data-access/products/get-products';

import { ProductOptionsDropdown } from './options-dropdown';

function getStatus(status: TProductStatus) {
  switch (status) {
    case 'IN_STOCK':
      return 'Em estoque';
    case 'OUT_OF_STOCK':
      return 'Fora de estoque';
  }
}

const sortStatus: SortingFn<IProductDTO> = (
  rowA: Row<IProductDTO>,
  rowB: Row<IProductDTO>,
  columnId: string
) => {
  const statusA = rowA.original.status;
  const statusB = rowB.original.status;

  if (statusA === statusB) {
    return 0;
  }
  if (statusA === 'IN_STOCK' && statusB === 'OUT_OF_STOCK') {
    return -1;
  }
  return 1;
};
export const columns: ColumnDef<IProductDTO>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc', true)
          }
        >
          Nome
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'stock',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Quantidade
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc', true)
          }
        >
          Valor unitário
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
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
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() =>
            column.toggleSorting(column.getIsSorted() === 'asc', true)
          }
        >
          Status
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    sortingFn: sortStatus,
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
        <ProductOptionsDropdown
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
