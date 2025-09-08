import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table';
import React, { useMemo } from 'react';
import { IAddedProduct } from './upsert-shet-content';
import { format } from 'path';
import { formatCurrency } from '@/utils/formatCurrency';

interface IProductToSaleTableProps {
  addedProducts: IAddedProduct[];
}

const ProductToSaleTable = ({ addedProducts }: IProductToSaleTableProps) => {
  const subtotal = useMemo(
    () =>
      addedProducts.reduce((acc, item) => acc + item.quantity * item.price, 0),
    [addedProducts]
  );

  return (
    <Table>
      <TableCaption>Lista de produtos da venda</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Nome</TableHead>
          <TableHead>Valor Unitário</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead className='text-right'>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {addedProducts.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='font-medium'>{item.name}</TableCell>
            <TableCell>{formatCurrency(item.price)}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell className='text-right'>
              {formatCurrency(item.price * item.quantity)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Subtotal</TableCell>
          <TableCell className='text-right'>
            {formatCurrency(subtotal)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default ProductToSaleTable;
