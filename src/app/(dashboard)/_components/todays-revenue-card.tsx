import { DollarSignIcon } from 'lucide-react';
import React from 'react';

import { getTodaysRevenue } from '@/app/_data-access/dashboard/get-todays-revenue';
import { formatCurrency } from '@/utils/formatCurrency';

import {
  InfoCard,
  InfoCardIcon,
  InfoCardTitle,
  InfoCardValue,
} from './info-card';

export const TodaysRevenueCard = async () => {
  const { todaysRevenue } = await getTodaysRevenue();

  return (
    <InfoCard>
      <InfoCardIcon>
        <DollarSignIcon />
      </InfoCardIcon>
      <InfoCardTitle>Receita Hoje</InfoCardTitle>
      <InfoCardValue>{formatCurrency(todaysRevenue)}</InfoCardValue>
    </InfoCard>
  );
};
