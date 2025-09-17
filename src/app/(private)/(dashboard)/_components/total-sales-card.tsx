import { CircleDollarSignIcon } from 'lucide-react';
import React from 'react';

import { getTotalSales } from '@/app/_data-access/dashboard/get-total-sales';

import {
  InfoCard,
  InfoCardIcon,
  InfoCardTitle,
  InfoCardValue,
} from './info-card';

export const TotalSalesCard = async () => {
  const { totalSales } = await getTotalSales();

  return (
    <InfoCard>
      <InfoCardIcon>
        <CircleDollarSignIcon />
      </InfoCardIcon>
      <InfoCardTitle>Vendais Totais</InfoCardTitle>
      <InfoCardValue>{totalSales}</InfoCardValue>
    </InfoCard>
  );
};
