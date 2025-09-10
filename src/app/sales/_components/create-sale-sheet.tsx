'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

import { createSale } from '@/app/_actions/sale/create-sale';
import { TCreateSaleSchema } from '@/app/_actions/sale/create-sale/schema';
import { Button } from '@/app/_components/ui/button';
import { IComboBoxOptions } from '@/app/_components/ui/combobox';
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet';
import { IProductDTO } from '@/app/_data-access/products/get-products';

import UpsertSheetContent from './upsert-sheet-content';

interface ICreateSaleSheetProps {
  comboOptions: IComboBoxOptions[];
  products: IProductDTO[];
}

const CreateSaleSheet = ({ comboOptions, products }: ICreateSaleSheetProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCreateSale = async (data: TCreateSaleSchema) => {
    try {
      await createSale(data);
      setIsSheetOpen(false);
      toast.success('Venda criada com sucesso.');
    } catch (err) {
      toast.error('Erro ao criar a venda.');
    }
  };
  const handleCloseSheet = () => {};

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
        onSaveSale={handleCreateSale}
      />
    </Sheet>
  );
};
export default CreateSaleSheet;
