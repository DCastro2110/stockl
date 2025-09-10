import { unstable_cache } from 'next/cache';

import { prisma } from '@/lib/prisma-client';

export interface ISaleDTO {
  name: string;
  id: string;
  totalValue: number;
  totalQuantity: number;
  date: Date;
}

async function getSales(): Promise<ISaleDTO[]> {
  const sales = await prisma.sale.findMany({
    include: {
      SaleProduct: {
        include: {
          product: true,
        },
      },
    },
  });

  const formattedSales: ISaleDTO[] = sales.map((sale) => ({
    name: sale.SaleProduct.map((sp) => sp.product.name).join(' • '),
    id: sale.id,
    totalValue: sale.SaleProduct.reduce(
      (acc, curr) => acc + Number(curr.unitPrice) * curr.quantity,
      0
    ),
    totalQuantity: sale.SaleProduct.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    ),
    date: sale.date,
    SaleProduct: sale.SaleProduct.map((saleProduct) => ({
      id: saleProduct.id,
      saleId: saleProduct.saleId,
      productId: saleProduct.productId,
      quantity: saleProduct.quantity,
      unitValue: Number(saleProduct.unitPrice),
    })),
  }));

  return formattedSales;
}

export const getSalesCached = unstable_cache(getSales, [], {
  revalidate: 10,
  tags: ['get-all-sales'],
});
