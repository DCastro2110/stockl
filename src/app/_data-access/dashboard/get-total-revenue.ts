import { prisma } from '@/lib/prisma-client';

export interface ITotalRevenueDTO {
  totalRevenue: number;
}

export async function getTotalRevenue() {
  const allSalesProducts = await prisma.saleProduct.findMany();
  const totalValue = allSalesProducts.reduce((acc, item) => {
    return acc + Number(item.unitPrice) * item.quantity;
  }, 0);
  return { totalRevenue: Number(totalValue) };
}
