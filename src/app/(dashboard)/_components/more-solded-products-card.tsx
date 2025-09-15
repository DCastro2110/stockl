import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import { ScrollArea } from '@/app/_components/ui/scroll-area';
import { getMoreSoldedProducts } from '@/app/_data-access/dashboard/get-more-products-sold';

import {
  MoreSoldedProductItem,
  MoreSoldedProductItemSkeleton,
} from './more-solded-product-item';

export const MoreSoldedProductsCard = async ({}) => {
  const moreSoldedProducts = await getMoreSoldedProducts();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos mais vendidos</CardTitle>
        <CardDescription>
          Produtos mais vendidos de todos os tempos
        </CardDescription>
      </CardHeader>
      <CardContent className='flex min-h-100 items-center justify-center'>
        {moreSoldedProducts.length === 0 ? (
          <div className='flex h-full w-full items-center justify-center'>
            <p>Não há nenhum produto mais vendido.</p>
          </div>
        ) : (
          <ScrollArea className='h-full max-h-100 w-full'>
            <div className='flex flex-col gap-4'>
              {moreSoldedProducts.map((product) => (
                <MoreSoldedProductItem
                  product={product}
                  key={product.id}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export const MoreSoldedProductsCardSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Produtos mais vendidos</CardTitle>
        <CardDescription>
          Produtos mais vendidos de todos os tempos
        </CardDescription>
      </CardHeader>
      <CardContent className='flex min-h-100 items-center justify-center'>
        <ScrollArea className='h-full max-h-100 w-full'>
          <div className='flex flex-col gap-4'>
            <MoreSoldedProductItemSkeleton />
            <MoreSoldedProductItemSkeleton />
            <MoreSoldedProductItemSkeleton />
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
