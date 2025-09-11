import { DollarSignIcon } from 'lucide-react';

import {
  Header,
  HeaderLeft,
  HeaderSubtitle,
  HeaderTitle,
} from '../_components/common/header';
import {
  InfoCard,
  InfoCardIcon,
  InfoCardTitle,
  InfoCardValue,
} from './_components/info-card';

const Dashboard = () => {
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
            <InfoCardValue>R$ 0,00</InfoCardValue>
          </InfoCard>
          <InfoCard>
            <InfoCardIcon>
              <DollarSignIcon />
            </InfoCardIcon>
            <InfoCardTitle>Receita Hoje</InfoCardTitle>
            <InfoCardValue>R$ 0,00</InfoCardValue>
          </InfoCard>
        </div>

        <div className='grid grid-cols-3 gap-4'>
          <InfoCard>
            <InfoCardIcon>
              <DollarSignIcon />
            </InfoCardIcon>
            <InfoCardTitle>Vendais Totais</InfoCardTitle>
            <InfoCardValue>R$ 100000,00</InfoCardValue>
          </InfoCard>
          <InfoCard>
            <InfoCardIcon>
              <DollarSignIcon />
            </InfoCardIcon>
            <InfoCardTitle>Total em Estoque</InfoCardTitle>
            <InfoCardValue>100000</InfoCardValue>
          </InfoCard>
          <InfoCard>
            <InfoCardIcon>
              <DollarSignIcon />
            </InfoCardIcon>
            <InfoCardTitle>Produtos</InfoCardTitle>
            <InfoCardValue>1000</InfoCardValue>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
