import { prisma } from '@/lib/prisma-client';

import { IProductDTO } from '../products/get-products';

export interface ISaleProductDTO {
  id: string;
  saleId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  product: IProductDTO;
}
export interface ISaleDTO {
  name: string;
  id: string;
  totalPrice: number;
  totalQuantity: number;
  date: Date;
  SaleProducts: ISaleProductDTO[];
}

export async function getSales(): Promise<ISaleDTO[]> {
  const sales = await prisma.sale.findMany({
    include: {
      SaleProduct: {
        include: {
          product: true,
        },
      },
    },
  });

  const formattedSales: ISaleDTO[] = sales.map((sale) => ({
    name: sale.SaleProduct.map((sp) => sp.product.name).join(' • '),
    id: sale.id,
    totalPrice: sale.SaleProduct.reduce(
      (acc, curr) => acc + Number(curr.unitPrice) * curr.quantity,
      0
    ),
    totalQuantity: sale.SaleProduct.reduce(
      (acc, curr) => acc + curr.quantity,
      0
    ),
    date: sale.date,
    SaleProducts: sale.SaleProduct.map((saleProduct) => ({
      id: saleProduct.id,
      saleId: saleProduct.saleId,
      productId: saleProduct.productId,
      quantity: saleProduct.quantity,
      unitPrice: Number(saleProduct.unitPrice),
      product: {
        id: saleProduct.product.id,
        name: saleProduct.product.name,
        price: Number(saleProduct.product.price),
        stock: saleProduct.product.stock,
        status: saleProduct.product.stock > 0 ? 'IN_STOCK' : 'OUT_OF_STOCK',
      },
    })),
  }));

  return formattedSales;
}
