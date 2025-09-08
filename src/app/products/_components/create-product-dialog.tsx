'use client';

import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { upsertProduct } from '@/app/_actions/product/upsert-product';
import { TUpsertProductSchema } from '@/app/_actions/product/upsert-product/schema';
import { Button } from '@/app/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/app/_components/ui/dialog';

import { UpsertProductForm } from './upsert-product-form';

export const CreateProductDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = (data: TUpsertProductSchema) => {
    try {
      upsertProduct(data);
      setIsDialogOpen(false);
      toast('Produto criado com sucesso.');
    } catch (err) {
      console.log(err);
      toast('Erro ao criar o produto.');
    }
  };

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger asChild>
        <Button className='gap-2'>
          <PlusIcon />
          Adicionar produto
        </Button>
      </DialogTrigger>
      <DialogContent className='w-full max-w-[320px]!'>
        <DialogHeader>
          <h3 className='text-2xl font-semibold'>Cadastrar produto</h3>
          <span className='text-sm'>Insira as informações abaixo</span>
        </DialogHeader>
        <UpsertProductForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
