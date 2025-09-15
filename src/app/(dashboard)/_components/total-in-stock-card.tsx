import { CircleDollarSignIcon } from 'lucide-react';
import React from 'react';

import { getTotalInStock } from '@/app/_data-access/dashboard/get-total-in-stock';

import {
  InfoCard,
  InfoCardIcon,
  InfoCardTitle,
  InfoCardValue,
} from './info-card';

export const TotalInStockCard = async () => {
  const { totalInStock } = await getTotalInStock();

  return (
    <InfoCard>
      <InfoCardIcon>
        <CircleDollarSignIcon />
      </InfoCardIcon>
      <InfoCardTitle>Vendais Totais</InfoCardTitle>
      <InfoCardValue>{totalInStock}</InfoCardValue>
    </InfoCard>
  );
};
