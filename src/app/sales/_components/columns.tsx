'use client';

import { ColumnDef } from '@tanstack/react-table';

import { IComboBoxOptions } from '@/app/_components/ui/combobox';
import { IProductDTO } from '@/app/_data-access/products/get-products';
import { ISaleDTO } from '@/app/_data-access/sale/get-sales';
import { formatCurrency } from '@/utils/formatCurrency';

import { SaleOptionsDropdown } from './options-dropdown';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface ISaleTableColumns extends ISaleDTO {
  products: IProductDTO[];
  comboOptions: IComboBoxOptions[];
}

export const columns: ColumnDef<ISaleTableColumns>[] = [
  {
    accessorKey: 'name',
    header: 'Produtos',
    cell: ({ row }) => {
      const { name } = row.original;
      return <p className='max-w-60 truncate'>{name}</p>;
    },
  },
  {
    accessorKey: 'totalQuantity',
    header: 'Quantidade de Produtos',
  },
  {
    accessorKey: 'totalValue',
    header: 'Valor Total',
    cell: ({ row }) => {
      const { totalPrice } = row.original;
      return formatCurrency(totalPrice);
    },
  },
  {
    accessorKey: 'date',
    header: 'Data da Venda',
    cell: ({ row }) => {
      const { date } = row.original;
      return new Date(date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    },
  },
  {
    accessorKey: '',
    header: 'Ações',
    cell: ({ row }) => {
      const sale = row.original as ISaleDTO;
      return (
        <SaleOptionsDropdown
          sale={{
            date: sale.date,
            name: sale.name,
            id: sale.id,
            totalQuantity: sale.totalQuantity,
            totalPrice: sale.totalPrice,
            SaleProducts: sale.SaleProducts,
          }}
          products={row.original.products}
          comboOptions={row.original.comboOptions}
        />
      );
    },
  },
];
