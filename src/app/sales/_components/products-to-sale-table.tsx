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
import { Trash2Icon } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';

interface IProductToSaleTableProps {
  addedProducts: IAddedProduct[];
  handleDeleteProduct: (productId: string) => void;
}

const ProductToSaleTable = ({
  addedProducts,
  handleDeleteProduct,
}: IProductToSaleTableProps) => {
  const subtotal = useMemo(
    () =>
      addedProducts.reduce(
        (acc, item) => acc + item.quantity * item.unitPrice,
        0
      ),
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
          <TableHead>Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {addedProducts.map((item) => (
          <TableRow key={item.id}>
            <TableCell className='font-medium'>{item.name}</TableCell>
            <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>
              {formatCurrency(item.unitPrice * item.quantity)}
            </TableCell>
            <TableCell className='text-right'>
              <Button
                variant='ghost'
                onClick={() => handleDeleteProduct(item.id)}
              >
                <Trash2Icon
                  className='text-right'
                  size={16}
                />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Subtotal</TableCell>
          <TableCell className='text-right'>
            {formatCurrency(subtotal)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default ProductToSaleTable;
