import {
  CircleDollarSignIcon,
  DollarSignIcon,
  Package2Icon,
  ShoppingBasketIcon,
} from 'lucide-react';

import { formatCurrency } from '@/utils/formatCurrency';

import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/common/header';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../_components/ui/card';
import { ScrollArea } from '../_components/ui/scroll-area';
import { getDashboard } from '../_data-access/dashboard/get-dashboard';
import { BarChartDefault } from './_components/bar-chart-default';
import {
  InfoCard,
  InfoCardIcon,
  InfoCardTitle,
  InfoCardValue,
} from './_components/info-card';
import { ProductMoreSold } from './_components/product-more-sold';

const Dashboard = async () => {
  const {
    todaysRevenue,
    totalInStock,
    totalProducts,
    totalRevenue,
    totalSales,
    totalSalesInLast14Days,
    theProductsMoreSold,
  } = await getDashboard();
  return (
    <div className='p-8'>
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Dashboard</HeaderSubtitle>
          <HeaderTitle>Dashboard</HeaderTitle>
        </HeaderLeft>
      </Header>
      <div className='flex flex-col gap-4'>
        <div className='grid grid-cols-2 gap-4'>
          <InfoCard>
            <InfoCardIcon>
              <DollarSignIcon />
            </InfoCardIcon>
            <InfoCardTitle>Receita Total</InfoCardTitle>
            <InfoCardValue>{formatCurrency(totalRevenue)}</InfoCardValue>
          </InfoCard>
          <InfoCard>
            <InfoCardIcon>
              <DollarSignIcon />
            </InfoCardIcon>
            <InfoCardTitle>Receita Hoje</InfoCardTitle>
            <InfoCardValue>{formatCurrency(todaysRevenue)}</InfoCardValue>
          </InfoCard>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <InfoCard>
            <InfoCardIcon>
              <CircleDollarSignIcon />
            </InfoCardIcon>
            <InfoCardTitle>Vendais Totais</InfoCardTitle>
            <InfoCardValue>{totalSales}</InfoCardValue>
          </InfoCard>
          <InfoCard>
            <InfoCardIcon>
              <Package2Icon />
            </InfoCardIcon>
            <InfoCardTitle>Total em Estoque</InfoCardTitle>
            <InfoCardValue>{totalInStock}</InfoCardValue>
          </InfoCard>
          <InfoCard>
            <InfoCardIcon>
              <ShoppingBasketIcon />
            </InfoCardIcon>
            <InfoCardTitle>Produtos</InfoCardTitle>
            <InfoCardValue>{totalProducts}</InfoCardValue>
          </InfoCard>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <BarChartDefault
            className='col-span-2'
            chartData={totalSalesInLast14Days}
          />
          <Card>
            <CardHeader>
              <CardTitle>Produtos mais vendidos</CardTitle>
              <CardDescription>
                Produtos mais vendidos de todos os tempos
              </CardDescription>
            </CardHeader>
            <CardContent className='flex min-h-100 items-center justify-center'>
              {theProductsMoreSold.length === 0 ? (
                <div className='flex h-full w-full items-center justify-center'>
                  <p>Não há nenhum produto mais vendido.</p>
                </div>
              ) : (
                <ScrollArea className='h-full max-h-100 w-full'>
                  <div className='flex flex-col gap-4'>
                    {theProductsMoreSold.map((product) => (
                      <ProductMoreSold
                        productName={product.name}
                        productPrice={product.price}
                        productStatus={product.status}
                        totalQuantitySold={product.totalQuantity}
                        key={product.id}
                      />
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
