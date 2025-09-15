import { prisma } from '@/lib/prisma-client';

export interface ITotalProductsDTO {
  totalProducts: number;
}

export async function getTotalProducts() {
  const totalProducts = await prisma.product.count();

  return { totalProducts: Number(totalProducts) };
}
