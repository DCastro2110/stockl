'use client';

import React from 'react';

import { TUpsertProductSchema } from '@/app/_actions/product/upsert-product/schema';
import { DialogContent, DialogHeader } from '@/app/_components/ui/dialog';

import { Product } from '../../../../generated/prisma';
import { UpsertProductForm } from './upsert-product-form';
import { TProduct } from './columns';

interface IEditProductDialogProps {
  handleEditProduct: (data: TUpsertProductSchema) => void;
  product: Omit<TProduct, 'createdAt' | 'updatedAt'>;
}

export const EditProductDialog = ({
  product,
  handleEditProduct,
}: IEditProductDialogProps) => {
  return (
    <DialogContent className='w-full max-w-[320px]!'>
      <DialogHeader>
        <h3 className='text-2xl font-semibold'>Editar produto</h3>
        <span className='text-sm'>Edite as informações abaixo</span>
      </DialogHeader>
      <UpsertProductForm
        product={product}
        onSubmit={handleEditProduct}
      />
    </DialogContent>
  );
};
