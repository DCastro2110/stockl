'use server';

import { prisma } from '@/lib/prisma-client';
import { TUpsertSaleSchema, upsertSaleSchema } from './schema';
import { SaleProduct } from '../../../../../generated/prisma';
import { Decimal } from '../../../../../generated/prisma/runtime/library';

interface IFormattedProducts {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export async function upsertSale(data: TUpsertSaleSchema) {
  upsertSaleSchema.parse(data);

  let formattedProducts: IFormattedProducts[] = [];

  await new Promise((resolve, reject) => {
    data.products.forEach(async (item, index, array) => {
      const product = await prisma.product.findFirst({
        where: {
          id: item.id,
        },
      });

      if (!product) {
        reject(new Error('Product not found'));
        return;
      }

      if (item.quantity > product.stock) {
        reject(new Error('Product out of stock'));
        return;
      }

      formattedProducts.push({
        productId: item.id,
        quantity: item.quantity,
        unitPrice: Number(product.price),
      });

      if (index === array.length - 1) {
        resolve(null);
      }
    });
  });

  await prisma.sale.upsert({
    where: {
      id: data.saleId || '',
    },
    update: {},
    create: {
      date: data.date || new Date(),
      SaleProduct: {
        createMany: {
          data: formattedProducts,
        },
      },
    },
  });
}
