import React from 'react';

import { DataTable } from '../_components/common/data-table';
import { IComboBoxOptions } from '../_components/ui/combobox';
import { getProductsCached } from '../_data-access/products/get-products';
import { getSalesCached } from '../_data-access/sale/get-sales';
import { columns } from './_components/columns';
import CreateSaleSheet from './_components/create-sale-sheet';

const SalesPage = async () => {
  const products = await getProductsCached();
  const sales = await getSalesCached();
  const comboOptions: IComboBoxOptions[] = products.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <div className='px-8 py-8'>
      <header className='flex flex-col gap-2 px-2 py-4'>
        <h2 className='text-sm font-semibold text-green-500'>Vendas</h2>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-xl font-semibold'>Gestão de Vendas</h1>
          <CreateSaleSheet
            products={products}
            comboOptions={comboOptions}
          />
        </div>
        <DataTable
          data={sales}
          columns={columns}
        />
      </header>
    </div>
  );
};
export default SalesPage;
