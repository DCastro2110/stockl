'use client';

import { PlusIcon } from 'lucide-react';
import React from 'react';

import { Button } from '@/app/_components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '@/app/_components/ui/dialog';

import { CreateProductForm } from './create-product-form';

export const CreateProductDialog = () => {
  return (
    <Dialog>
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
        <CreateProductForm />
      </DialogContent>
    </Dialog>
  );
};
