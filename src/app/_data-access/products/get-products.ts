import { TProduct } from '@/app/products/_components/columns';
import { prisma } from '@/lib/prisma-client';

export async function getProducts(): Promise<TProduct[]> {
  const products = await prisma.product.findMany();
  const productWithPriceAsNumber = products.map((item) => ({
    ...item,
    price: Number(item.price),
  }));

  return productWithPriceAsNumber;
}
