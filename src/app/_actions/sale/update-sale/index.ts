'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma-client';

import { TUpdateSaleSchema, updateSaleSchema } from './schema';

interface IFormattedProducts {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export async function updateSale({
  date: dateOfSale,
  products,
  saleId,
}: TUpdateSaleSchema) {
  updateSaleSchema.parse({
    date: dateOfSale,
    products,
  });

  await prisma.$transaction(async (tx) => {
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

      const selectedSaleProduct = await prisma.saleProduct.findFirst({
        where: {
          saleId: saleId,
          productId: product.id,
        },
      });

      const prevQuantity = selectedSaleProduct
        ? selectedSaleProduct.quantity
        : 0;
      const quantityDiff = product.quantity - prevQuantity;

      if (selectedProduct.stock - quantityDiff <= 0) {
        throw new Error('Product out of stock');
      }

      await tx.saleProduct.deleteMany({
        where: {
          saleId: saleId,
          productId: product.id,
        },
      });

      await tx.saleProduct.create({
        data: {
          quantity: product.quantity,
          unitPrice: selectedProduct.price,
          productId: product.id,
          saleId: saleId,
        },
      });

      await tx.product.update({
        where: {
          id: product.id,
        },
        data: {
          stock: selectedProduct.stock - quantityDiff,
        },
      });
    }

    revalidatePath('/sales');
    revalidatePath('/products');
  });
}
