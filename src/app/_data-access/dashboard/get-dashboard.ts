import { prisma } from '@/lib/prisma-client';

export interface IDashboardDTO {
  totalRevenue: number;
  todaysRevenue: number;
  totalSales: number;
  totalInStock: number;
  totalProducts: number;
}

export async function getDashboard() {
  const totalRevenuePromise = async () => {
    const allSalesProducts = await prisma.saleProduct.findMany();
    const totalValue = allSalesProducts.reduce((acc, item) => {
      return acc + Number(item.unitPrice) * item.quantity;
    }, 0);
    return totalValue;
  };

  const todaysRevenuePromise = async () => {
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
    return totalValue;
  };

  const totalSalesPromise = prisma.sale.count();

  const totalInStockPromise = prisma.product.aggregate({
    _sum: {
      stock: true,
    },
  });

  const totalProductsPromise = prisma.product.count();

  const [totalRevenue, todaysRevenue, totalSales, totalInStock, totalProducts] =
    await Promise.all([
      totalRevenuePromise(),
      todaysRevenuePromise(),
      totalSalesPromise,
      totalInStockPromise,
      totalProductsPromise,
    ]);

  return {
    totalRevenue,
    todaysRevenue,
    totalSales,
    totalInStock: totalInStock._sum.stock || 0,
    totalProducts,
  };
}
