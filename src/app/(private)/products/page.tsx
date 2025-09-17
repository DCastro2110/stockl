import React from 'react';

import { DataTable } from '@/app/_components/common/data-table';

import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from '../../_components/common/header';
import { getProducts } from '../../_data-access/products/get-products';
import { columns } from './_components/columns';
import { CreateProductDialog } from './_components/create-product-dialog';

const ProductsPage = async () => {
  const product = await getProducts();

  return (
    <div className='h-full px-8 py-8'>
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Produtos</HeaderSubtitle>
          <HeaderTitle>Gestão de Produtos</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateProductDialog />
        </HeaderRight>
      </Header>

      <DataTable
        columns={columns}
        data={product}
      ></DataTable>
    </div>
  );
};
export default ProductsPage;
