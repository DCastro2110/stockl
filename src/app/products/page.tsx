import React from 'react';

import { Header } from '@/app/_components/common/header';

import { getProducts } from '../_data-access/products/get-products';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

const ProductsPage = async () => {
  const product = await getProducts();

  return (
    <div className='px-8 py-8'>
      <Header
        title='oi'
        subtitle='oi'
      />
      <DataTable
        columns={columns}
        data={product}
      ></DataTable>
    </div>
  );
};
export default ProductsPage;
