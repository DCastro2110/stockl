import React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import { Skeleton } from '@/app/_components/ui/skeleton';
import { getTotalSalesInLast14Days } from '@/app/_data-access/dashboard/get-total-sales-in-last-14-days';

import { BarChartDefault } from './bar-chart-default';

export const TotalSalesInLast14DaysCard = async ({}) => {
  const totalSalesInLast14Days = await getTotalSalesInLast14Days();

  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle>Receita</CardTitle>
        <CardDescription>Últimos 14 dias</CardDescription>
      </CardHeader>
      <CardContent className='flex min-h-100 items-center justify-center'>
        <BarChartDefault chartData={totalSalesInLast14Days} />
      </CardContent>
    </Card>
  );
};

export const TotalSalesInLast14DaysCardSkeleton = () => {
  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle>Receita</CardTitle>
        <CardDescription>Últimos 14 dias</CardDescription>
      </CardHeader>
      <CardContent className='flex min-h-120 items-center justify-center'>
        <Skeleton className='h-full min-h-120 w-full' />
      </CardContent>
    </Card>
  );
};
