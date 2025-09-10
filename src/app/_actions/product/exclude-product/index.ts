'use server';

import { revalidatePath } from 'next/cache';

import { prisma } from '@/lib/prisma-client';

import { excludeProductSchema, TExcludeProductSchema } from './schema';

export async function excludeProduct({ id }: TExcludeProductSchema) {
  excludeProductSchema.parse({ id });
  await prisma.product.delete({
    where: {
      id,
    },
  });

  revalidatePath('/products');
}
