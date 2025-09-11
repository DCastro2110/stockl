'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma-client';

import { deleteSaleSchema, TDeleteSaleSchema } from './schema';

export const deleteSale = async ({ id }: TDeleteSaleSchema) => {
  deleteSaleSchema.parse({ id });

  await prisma.$transaction(async (tx) => {
    const saleProducts = await tx.saleProduct.findMany({
      where: { saleId: id },
    });

    // Deve retonar uma função PROMISE
    await Promise.all(
      saleProducts.map(async (item) => {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              increment: item.quantity,
            },
          },
        });
      })
    );
    await tx.sale.delete({ where: { id } });
  });

  revalidatePath('/sales');
  revalidatePath('/products');
  revalidatePath('/');
};
