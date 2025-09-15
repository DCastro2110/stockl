import { CircleIcon } from 'lucide-react';
import React from 'react';

import { Badge } from '@/app/_components/ui/badge';
import { Card, CardContent } from '@/app/_components/ui/card';
import { Skeleton } from '@/app/_components/ui/skeleton';
import { IMoreSoldedProductsDTO } from '@/app/_data-access/dashboard/get-more-products-sold';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/utils/formatCurrency';

interface IProductMoreSoldProps {
  product: IMoreSoldedProductsDTO;
}
export const MoreSoldedProductItem = ({ product }: IProductMoreSoldProps) => {
  const status =
    product.status === 'IN_STOCK' ? 'Em estoque' : 'Fora de estoque';

  const badgeStyle = cn(
    'py rounded-full px-4 font-bold flex justify-center items-center gap-2',
    product.status === 'IN_STOCK'
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
            <span className='block text-sm'>{product.name}</span>
            <p className='text-gray-500'>{formatCurrency(product.price)}</p>
          </div>
          <p className='font-semibold'>{product.totalQuantity} vendidos</p>
        </div>
      </CardContent>
    </Card>
  );
};

export const MoreSoldedProductItemSkeleton = () => {
  return (
    <div className='!w-full'>
      <div className='flex flex-col gap-6 p-6'>
        <Skeleton className='h-6 w-24 rounded-full bg-gray-200' />
        <div className='flex w-full justify-between'>
          <div className='space-y-1'>
            <Skeleton className='h-4 w-32 rounded bg-gray-200' />
            <Skeleton className='h-4 w-20 rounded bg-gray-200' />
          </div>
          <Skeleton className='h-4 w-20 rounded bg-gray-200' />
        </div>
      </div>
    </div>
  );
};
