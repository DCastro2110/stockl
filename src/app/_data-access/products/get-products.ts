import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/prisma-client';

export type TProductStatus = 'OUT_OF_STOCK' | 'IN_STOCK';
export interface IProductDTO {
  name: string;
  price: number;
  stock: number;
  id: string;
  status: TProductStatus;
}

async function getProducts(): Promise<IProductDTO[]> {
  const products = await prisma.product.findMany();
  const formattedProducts: IProductDTO[] = products.map((item) => {
    return {
      id: item.id,
      name: item.name,
      status: item.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
      price: Number(item.price),
      stock: item.stock,
    };
  });

  return formattedProducts;
}

export const getProductsCached = unstable_cache(getProducts, [], {
  revalidate: 10,
  tags: ['get-all-products'],
});
