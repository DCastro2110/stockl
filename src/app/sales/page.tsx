import React from 'react';

import { IComboBoxOptions } from '../_components/ui/combobox';
import { getProductsCached } from '../_data-access/products/get-products';
import CreateSaleSheet from './_components/create-sale-sheet';

const SalesPage = async () => {
  const products = await getProductsCached();
  const comboOptions: IComboBoxOptions[] = products.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  return (
    <div className='px-8 py-8'>
      <header className='flex flex-col gap-2 px-2 py-4'>
        <h2 className='text-sm font-semibold text-green-500'>Produtos</h2>
        <div className='flex w-full items-center justify-between'>
          <h1 className='text-xl font-semibold'>Gestão de Produtos</h1>
          <CreateSaleSheet
            products={products}
            comboOptions={comboOptions}
          />
        </div>
      </header>
    </div>
  );
};
export default SalesPage;
