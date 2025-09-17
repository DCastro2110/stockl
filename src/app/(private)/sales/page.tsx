import React from 'react';

import { DataTable } from '../../_components/common/data-table';
import {
  Header,
  HeaderLeft,
  HeaderRight,
  HeaderSubtitle,
  HeaderTitle,
} from '../../_components/common/header';
import { IComboBoxOptions } from '../../_components/ui/combobox';
import { getProducts } from '../../_data-access/products/get-products';
import { getSales } from '../../_data-access/sale/get-sales';
import { columns } from './_components/columns';
import CreateSaleSheet from './_components/create-sale-sheet';

const SalesPage = async () => {
  const products = await getProducts();
  const sales = await getSales();
  const comboOptions: IComboBoxOptions[] = products.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const dataTable = sales.map((sale) => ({
    ...sale,
    products,
    comboOptions,
  }));

  return (
    <div className='px-8 py-8'>
      <Header>
        <HeaderLeft>
          <HeaderSubtitle>Vendas</HeaderSubtitle>
          <HeaderTitle>Gestão de Vendas</HeaderTitle>
        </HeaderLeft>
        <HeaderRight>
          <CreateSaleSheet
            products={products}
            comboOptions={comboOptions}
          />
        </HeaderRight>
      </Header>

      <DataTable
        data={dataTable}
        columns={columns}
      />
    </div>
  );
};
export default SalesPage;
