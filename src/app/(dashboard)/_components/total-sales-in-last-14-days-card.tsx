import React from 'react';

import { getTotalSalesInLast14Days } from '@/app/_data-access/dashboard/get-total-sales-in-last-14-days';

import { BarChartDefault } from './bar-chart-default';

export const TotalSalesInLast14DaysCard = async ({}) => {
  const totalSalesInLast14Days = await getTotalSalesInLast14Days();

  return (
    <BarChartDefault
      className='col-span-2'
      chartData={totalSalesInLast14Days}
    />
  );
};
