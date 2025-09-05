'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma-client';

import { createProductSchema, TCreateProductSchema } from './schema';

export async function createProduct(data: TCreateProductSchema) {
  createProductSchema.parse(data);
  const status = data.stock > 0 ? 'active' : 'out_of_stock';

  await prisma.product.create({
    data: {
      ...data,
      status,
    },
  });

  revalidatePath('/products');
}
