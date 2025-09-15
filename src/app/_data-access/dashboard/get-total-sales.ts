import { prisma } from '@/lib/prisma-client';

export interface ITotalSalesDTO {
  totalSales: number;
}

export async function getTotalSales() {
  const totalSales = await prisma.sale.count();

  return {totalSales: Number(totalSales)};
}
