'use client';

import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { createProduct } from '@/app/_actions/product/create-product';
import { TCreateProductSchema } from '@/app/_actions/product/create-product/schema';
import { Button } from '@/app/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/app/_components/ui/dialog';

import { CreateProductForm } from './create-product-form';

export const CreateProductDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = (data: TCreateProductSchema) => {
    try {
      createProduct(data);
      setIsDialogOpen(false);
      toast('Produto criado com sucesso.');
    } catch (err) {
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
        <CreateProductForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};
