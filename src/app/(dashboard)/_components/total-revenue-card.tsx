import { DollarSignIcon } from 'lucide-react';
import React from 'react';

import { getTotalRevenue } from '@/app/_data-access/dashboard/get-total-revenue';
import { formatCurrency } from '@/utils/formatCurrency';

import {
  InfoCard,
  InfoCardIcon,
  InfoCardTitle,
  InfoCardValue,
} from './info-card';

export const TotalRevenueCard = async ({}) => {
  const { totalRevenue } = await getTotalRevenue();

  return (
    <InfoCard>
      <InfoCardIcon>
        <DollarSignIcon />
      </InfoCardIcon>
      <InfoCardTitle>Receita Total</InfoCardTitle>
      <InfoCardValue>{formatCurrency(totalRevenue)}</InfoCardValue>
    </InfoCard>
  );
};

