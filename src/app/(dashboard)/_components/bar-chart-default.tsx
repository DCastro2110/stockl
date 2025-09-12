'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart';
import { ITotalSalesInLast14Days } from '@/app/_data-access/dashboard/get-dashboard';
import { formatCurrency } from '@/utils/formatCurrency';

export const description = 'A bar chart';

interface IBarChartDefaultProps {
  chartData: ITotalSalesInLast14Days[];
}

const chartConfig = {
  totalValue: {
    label: 'Valor Total Vendido: ',
    color: 'oklch(72.3% 0.219 149.579)',
  },
} satisfies ChartConfig;

export const BarChartDefault = ({ chartData }: IBarChartDefaultProps) => {
  console.log('chartData', chartData);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Receita</CardTitle>
        <CardDescription>Últimos 14 dias</CardDescription>
      </CardHeader>
      <CardContent className='flex min-h-100 items-center justify-center'>
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
      </CardContent>
    </Card>
  );
};
