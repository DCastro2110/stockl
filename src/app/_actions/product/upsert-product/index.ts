'use server';

import { revalidatePath, revalidateTag } from 'next/cache';

import { prisma } from '@/lib/prisma-client';

import { TUpsertProductSchema, upsertProductSchema } from './schema';

export async function upsertProduct(data: TUpsertProductSchema) {
  upsertProductSchema.parse(data);

  const productWithoutId = {
    name: data.name,
    stock: data.stock,
    price: data.price,
  };
  try {
    await prisma.product.upsert({
      where: {
        id: data.id || '',
      },
      create: {
        ...productWithoutId,
      },
      update: {
        ...productWithoutId,
      },
    });
  } catch (err) {}

  revalidateTag('get-all-products');
}
