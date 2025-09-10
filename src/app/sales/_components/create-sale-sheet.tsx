'use client';

import React, { useState } from 'react';

import { Button } from '@/app/_components/ui/button';
import { IComboBoxOptions } from '@/app/_components/ui/combobox';
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet';
import { IProductDTO } from '@/app/_data-access/products/get-products';

import UpsertSheetContent from './upsert-shet-content';

interface ICreateSaleSheetProps {
  comboOptions: IComboBoxOptions[];
  products: IProductDTO[];
}

const CreateSaleSheet = ({ comboOptions, products }: ICreateSaleSheetProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={setIsSheetOpen}
    >
      <SheetTrigger asChild>
        <Button>Adicionar Venda</Button>
      </SheetTrigger>

      <UpsertSheetContent
        products={products}
        options={comboOptions}
        description='Adicionar informações sobre a venda abaixo.'
        title='Adicionar venda'
        endButtonLabel='Finalizar'
        handleCloseSheet={handleCloseSheet}
      />
    </Sheet>
  );
};
export default CreateSaleSheet;
