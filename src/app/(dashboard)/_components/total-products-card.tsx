import { ShoppingBasketIcon } from 'lucide-react';
import React from 'react';

import { getTotalProducts } from '@/app/_data-access/dashboard/get-total-products';

import {
  InfoCard,
  InfoCardIcon,
  InfoCardTitle,
  InfoCardValue,
} from './info-card';

export const TotalProductsCard = async ({}) => {
  const { totalProducts } = await getTotalProducts();

  return (
    <InfoCard>
      <InfoCardIcon>
        <ShoppingBasketIcon />
      </InfoCardIcon>
      <InfoCardTitle>Produtos</InfoCardTitle>
      <InfoCardValue>{totalProducts}</InfoCardValue>
    </InfoCard>
  );
};

