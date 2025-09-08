import React from 'react';

import { Button } from '../_components/ui/button';
import { IComboBoxOptions } from '../_components/ui/combobox';
import { Sheet, SheetTrigger } from '../_components/ui/sheet';
import { getProducts } from '../_data-access/products/get-products';
import UpsertSheetContent from './_components/upsert-shet-content';

const SalesPage = async () => {
  const products = await getProducts();
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
          <Sheet>
            <SheetTrigger asChild>
              <Button>Adicionar Venda</Button>
            </SheetTrigger>
            <UpsertSheetContent
              products={products}
              options={comboOptions}
              description='Adicionar informações sobre a venda abaixo.'
              title='Adicionar venda'
            />
          </Sheet>
        </div>
      </header>
    </div>
  );
};
export default SalesPage;
