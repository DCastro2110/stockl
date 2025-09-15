import { prisma } from '@/lib/prisma-client';

import { TProductStatus } from '../products/get-products';

export interface IMoreSoldedProductsDTO {
  id: string;
  name: string;
  price: number;
  stock: number;
  totalQuantity: number;
  status: TProductStatus;
}

export async function getMoreSoldedProducts(): Promise<
  IMoreSoldedProductsDTO[]
> {
  const moreSoldProducts = await prisma.$queryRaw<
    Omit<IMoreSoldedProductsDTO, 'status'>[]
  >`
      SELECT "Product"."id", "Product"."name", "Product"."price", "Product"."stock", SUM("SaleProduct"."quantity") as "totalQuantity"
      FROM "SaleProduct"
      JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
      GROUP BY "Product"."id"
      HAVING SUM("SaleProduct"."quantity") > 0
      ORDER BY "totalQuantity" DESC
      LIMIT 10;
    `;

  return moreSoldProducts.map((item) => ({
    ...item,
    price: Number(item.price),
    status: (item.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK') as TProductStatus,
  }));
}
