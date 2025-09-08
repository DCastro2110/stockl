'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma-client';

import { TUpsertProductSchema, upsertProductSchema } from './schema';

export async function upsertProduct(data: TUpsertProductSchema) {
  upsertProductSchema.parse(data);
  const status = data.stock > 0 ? 'active' : 'out_of_stock';

  const productWithoutId = {
    name: data.name,
    stock: data.stock,
    price: data.price,
    status: status,
  };

  await prisma.product.upsert({
    where: {
      id: data.id,
    },
    create: {
      ...productWithoutId,
    },
    update: {
      ...productWithoutId,
    },
  });

  revalidatePath('/products');
}
