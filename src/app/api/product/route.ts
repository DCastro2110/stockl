import { NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma-client';

export type TProductStatus = 'OUT_OF_STOCK' | 'IN_STOCK';
export interface IProductDTO {
  name: string;
  price: number;
  stock: number;
  id: string;
  status: TProductStatus;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';

  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
    take: 25,
    skip: (Number(page) - 1) * 25,
  });

  const formattedProducts: IProductDTO[] = products.map((item) => {
    return {
      id: item.id,
      name: item.name,
      status: item.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
      price: Number(item.price),
      stock: item.stock,
    };
  });

  return Response.json({
    status: 'success',
    statusCode: 200,
    data: formattedProducts,
  });
}
