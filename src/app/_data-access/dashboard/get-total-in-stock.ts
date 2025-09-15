import { prisma } from '@/lib/prisma-client';

export interface ITotalInStockDTO {
  totalInStock: number;
}

export async function getTotalInStock() {
  const totalInStock = await prisma.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  return {totalInStock: totalInStock._sum.stock ?? 0};
}
