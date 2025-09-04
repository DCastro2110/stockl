import React from 'react';

import { getProducts } from '../_data-access/products/get-products';
import { AddProductDialog } from './_components/add-product-dialog';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

const ProductsPage = async () => {
  const product = await getProducts();

  return (
    <div className='px-8 py-8'>
      <header className='flex flex-col gap-2 px-2 py-4'>
        <h2 className='text-sm font-semibold text-green-500'>Produtos</h2>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-xl font-semibold'>Gestão de Produtos</h1>
          <AddProductDialog />
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
