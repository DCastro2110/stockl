import { CircleIcon } from 'lucide-react';
import React from 'react';

import { Badge } from '@/app/_components/ui/badge';
import { Card, CardContent } from '@/app/_components/ui/card';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/formatCurrency';

interface IProductMoreSoldProps {
  productName: string;
  productPrice: number;
  totalQuantitySold: number;
  productStatus: 'IN_STOCK' | 'OUT_OF_STOCK';
}

export const ProductMoreSold = ({
  productName,
  productPrice,
  totalQuantitySold,
  productStatus,
}: IProductMoreSoldProps) => {
  const status =
    productStatus === 'IN_STOCK' ? 'Em estoque' : 'Fora de estoque';

  const badgeStyle = cn(
    'py rounded-full px-4 font-bold flex justify-center items-center gap-2',
    productStatus === 'IN_STOCK'
      ? 'bg-green-100 text-green-800 fill-green-800'
      : 'bg-red-100 text-red-800 fill-red-800'
  );

  return (
    <Card className='!w-full'>
      <CardContent className='flex flex-col gap-6 p-6'>
        <Badge className={badgeStyle}>
          <CircleIcon className='fill-inherit' />
          {status}
        </Badge>
        <div className='flex w-full justify-between'>
          <div className='space-y-1'>
            <span className='block text-sm'>{productName}</span>
            <p className='text-gray-500'>{formatCurrency(productPrice)}</p>
          </div>
          <p className='font-semibold'>{totalQuantitySold} vendidos</p>
        </div>
      </CardContent>
    </Card>
  );
};
