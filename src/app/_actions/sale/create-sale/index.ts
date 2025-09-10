'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma-client';

import { TUpsertSaleSchema, upsertSaleSchema } from './schema';

interface IFormattedProducts {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export async function createSale({
  date: dateOfSale,
  products,
}: TUpsertSaleSchema) {
  upsertSaleSchema.parse({
    date: dateOfSale,
    products,
  });

  const formattedProducts: IFormattedProducts[] = [];

  await prisma.$transaction(async (tx) => {
    const sale = await tx.sale.create({
      data: {
        date: dateOfSale || new Date(),
      },
    });

    for (const product of products) {
      const selectedProduct = await prisma.product.findFirst({
        where: {
          id: product.id,
        },
      });

      if (!selectedProduct) {
        throw new Error('Product not found');
      }

      if (product.quantity > selectedProduct.stock) {
        throw new Error('Product out of stock');
      }

      await tx.saleProduct.create({
        data: {
          quantity: product.quantity,
          unitPrice: selectedProduct.price,
          productId: product.id,
          saleId: sale.id,
        },
      });
    }

    revalidatePath('/sales');
    revalidatePath('/products');
  });
}
