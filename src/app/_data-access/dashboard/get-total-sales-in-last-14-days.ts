import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { cookies } from 'next/headers';

import { prisma } from '@/lib/prisma-client';

export interface ITotalSalesInLast14DaysDTO {
  salesDate: string;
  totalValue: number;
}

export async function getTotalSalesInLast14Days(): Promise<
  ITotalSalesInLast14DaysDTO[]
> {
  const userTimezone =
    (await cookies()).get('timezone')?.value || 'America/Sao_Paulo';

  dayjs.extend(utc);
  dayjs.extend(timezone);
  const today = dayjs().tz('America/Sao_Paulo').endOf('day');
  const todayLess = today.subtract(13, 'day').startOf('day');

  const totalSalesInLast14Days = await prisma.$queryRaw<
    ITotalSalesInLast14DaysDTO[]
  >`
  SELECT DATE_TRUNC('DAY',"Sale"."date"::timestamptz AT TIME ZONE ${userTimezone}) as "salesDate", SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") as "totalValue"
  FROM "Sale"
  JOIN "SaleProduct" ON "Sale"."id" = "SaleProduct"."saleId"
  WHERE "Sale"."date"::timestamptz AT TIME ZONE ${userTimezone} <= ${today.toDate()} AND "Sale"."date"::timestamptz AT TIME ZONE ${userTimezone} >= ${todayLess.toDate()} 
  GROUP BY "salesDate"
  ORDER BY "salesDate";`;

  return totalSalesInLast14Days.map((item) => {
    return {
      salesDate: dayjs(item.salesDate)
        .subtract(today.utcOffset(), 'minute')
        .toDate()
        .toUTCString(),
      totalValue: Number(item.totalValue),
    };
  });
}
