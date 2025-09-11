import { DollarSignIcon } from 'lucide-react';

import { formatCurrency } from '@/utils/formatCurrency';

import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/common/header';
import { getDashboard } from '../_data-access/dashboard/get-dashboard';
import {
  InfoCard,
  InfoCardIcon,
  InfoCardTitle,
  InfoCardValue,
} from './_components/info-card';

const Dashboard = async () => {
  const {
    todaysRevenue,
    totalInStock,
    totalProducts,
    totalRevenue,
    totalSales,
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
              <DollarSignIcon />
            </InfoCardIcon>
            <InfoCardTitle>Vendais Totais</InfoCardTitle>
            <InfoCardValue>{totalSales}</InfoCardValue>
          </InfoCard>
          <InfoCard>
            <InfoCardIcon>
              <DollarSignIcon />
            </InfoCardIcon>
            <InfoCardTitle>Total em Estoque</InfoCardTitle>
            <InfoCardValue>{totalInStock}</InfoCardValue>
          </InfoCard>
          <InfoCard>
            <InfoCardIcon>
              <DollarSignIcon />
            </InfoCardIcon>
            <InfoCardTitle>Produtos</InfoCardTitle>
            <InfoCardValue>{totalProducts}</InfoCardValue>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
