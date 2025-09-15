import 'server-only';

import { prisma } from '@/lib/prisma-client';

export interface ITodaysRevenueDTO {
  todaysRevenue: number;
}

export async function getTodaysRevenue() {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const todaysSalesProducts = await prisma.saleProduct.findMany({
    where: {
      sale: {
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    },
  });

  const totalValue = todaysSalesProducts.reduce((acc, item) => {
    return acc + Number(item.unitPrice) * item.quantity;
  }, 0);
  return { todaysRevenue: totalValue };
}
