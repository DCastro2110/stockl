import { prisma } from '@/lib/prisma-client';

export interface ITotalProductsDTO {
  totalProducts: number;
}

export function getTotalProducts() {
  const totalProducts = prisma.product.count();

  return { totalProducts: Number(totalProducts) };
}
