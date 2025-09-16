import { prisma } from '@/lib/prisma-client';

export type TProductStatus = 'OUT_OF_STOCK' | 'IN_STOCK';
export interface IProductDTO {
  name: string;
  price: number;
  stock: number;
  id: string;
  status: TProductStatus;
}

export async function getProducts(): Promise<IProductDTO[]> {
  const products = await prisma.product.findMany({
    orderBy: { name: 'asc' },
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

  return formattedProducts;
}
