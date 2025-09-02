import React from 'react';

import { prisma } from '@/lib/prisma-client';

import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

const Home = async () => {
  const data = await prisma.product.findMany();
  const productWithPriceAsNumber = data.map((item) => ({
    ...item,
    price: Number(item.price),
  }));

  return (
    <div>
      <DataTable
        columns={columns}
        data={productWithPriceAsNumber}
      ></DataTable>
    </div>
  );
};
export default Home;
