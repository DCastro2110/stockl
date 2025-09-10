import React from 'react';

import { DataTable } from '@/app/_components/common/data-table';

import { getProductsCached } from '../_data-access/products/get-products';
import { columns } from './_components/columns';
import { CreateProductDialog } from './_components/create-product-dialog';

const ProductsPage = async () => {
  const product = await getProductsCached();

  return (
    <div className='px-8 py-8'>
      <header className='flex flex-col gap-2 px-2 py-4'>
        <h2 className='text-sm font-semibold text-green-500'>Produtos</h2>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-xl font-semibold'>Gestão de Produtos</h1>
          <CreateProductDialog />
        </div>
      </header>
      <DataTable
        columns={columns}
        data={product}
      ></DataTable>
    </div>
  );
};
export default ProductsPage;
