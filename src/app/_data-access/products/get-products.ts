import { prisma } from '@/lib/prisma-client';

import { Product } from '../../../../generated/prisma';

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany();
  const productWithPriceAsNumber = products.map((item) => ({
    ...item,
    price: Number(item.price),
  }));

  return productWithPriceAsNumber;
}
