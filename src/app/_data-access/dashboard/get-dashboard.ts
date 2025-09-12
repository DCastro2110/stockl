import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { cookies } from 'next/headers';

import { prisma } from '@/lib/prisma-client';

export interface ITotalSalesInLast14Days {
  salesDate: string;
  totalValue: number;
}
export interface IDashboardDTO {
  totalRevenue: number;
  todaysRevenue: number;
  totalSales: number;
  totalInStock: number;
  totalProducts: number;
  totalSalesInLast14Days: ITotalSalesInLast14Days[];
}

export async function getDashboard() {
  const userTimezone =
    (await cookies()).get('timezone')?.value || 'America/Sao_Paulo';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  const today = dayjs().tz('America/Sao_Paulo').endOf('day');
  const todayLess = today.subtract(13, 'day').startOf('day');

  const totalSalesInLast14DaysPromise = prisma.$queryRaw<
    ITotalSalesInLast14Days[]
  >`
  SELECT DATE_TRUNC('DAY',"Sale"."date"::timestamptz AT TIME ZONE ${userTimezone}) as "salesDate", SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalValue"
  FROM "Sale"
  JOIN "SaleProduct" ON "Sale"."id" = "SaleProduct"."saleId"
  WHERE "Sale"."date"::timestamptz AT TIME ZONE ${userTimezone} <= ${today.toDate()} AND "Sale"."date"::timestamptz AT TIME ZONE ${userTimezone} >= ${todayLess.toDate()} 
  GROUP BY "salesDate"
  ORDER BY "salesDate";`;

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

  const [
    totalRevenue,
    todaysRevenue,
    totalSales,
    totalInStock,
    totalProducts,
    totalSalesInLast14Days,
  ] = await Promise.all([
    totalRevenuePromise(),
    todaysRevenuePromise(),
    totalSalesPromise,
    totalInStockPromise,
    totalProductsPromise,
    totalSalesInLast14DaysPromise,
  ]);

  return {
    totalRevenue,
    todaysRevenue,
    totalSales,
    totalInStock: totalInStock._sum.stock || 0,
    totalProducts,
    totalSalesInLast14Days: totalSalesInLast14Days.map((item) => {
      console.log(new Date(item.salesDate).getTimezoneOffset());
      return {
        salesDate: dayjs(item.salesDate)
          .subtract(today.utcOffset(), 'minute')
          .toDate(),
        totalValue: Number(item.totalValue),
      };
    }),
  };
}
