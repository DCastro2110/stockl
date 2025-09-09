'use client';

import { Button } from '@/app/_components/ui/button';
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet';
import React, { useState } from 'react';
import UpsertSheetContent from './upsert-shet-content';
import { IComboBoxOptions } from '@/app/_components/ui/combobox';
import { TProduct } from '@/app/products/_components/columns';

interface ICreateSaleSheetProps {
  comboOptions: IComboBoxOptions[];
  products: TProduct[];
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
