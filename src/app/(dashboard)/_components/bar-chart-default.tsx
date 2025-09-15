'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart';
import { ITotalSalesInLast14DaysDTO } from '@/app/_data-access/dashboard/get-total-sales-in-last-14-days';
import { formatCurrency } from '@/utils/formatCurrency';

export const description = 'A bar chart';

interface IBarChartDefaultProps {
  chartData: ITotalSalesInLast14DaysDTO[];
  className?: string;
}

const chartConfig = {
  totalValue: {
    label: 'Valor Total Vendido: ',
    color: 'oklch(72.3% 0.219 149.579)',
  },
} satisfies ChartConfig;

export const BarChartDefault = ({ chartData }: IBarChartDefaultProps) => {
  return (
    <>
      {chartData.length === 0 ? (
        <div className='flex h-full w-full items-center justify-center'>
          <p>Não há nenhuma venda nesse período.</p>
        </div>
      ) : (
        <ChartContainer
          className='min-h-0 w-full'
          config={chartConfig}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='salesDate'
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString()}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => formatCurrency(Number(value))}
                  labelFormatter={(label) =>
                    new Date(label).toLocaleDateString()
                  }
                />
              }
            />
            <Bar
              dataKey='totalValue'
              fill='var(--color-totalValue)'
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      )}
    </>
  );
};
