'use server';

import { revalidateTag } from 'next/cache';

import { prisma } from '@/lib/prisma-client';

import { excludeProductSchema, TExcludeProductSchema } from './schema';

export async function excludeProduct({ id }: TExcludeProductSchema) {
  excludeProductSchema.parse({ id });
  const data = await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidateTag('get-all-products');
  return data;
}
