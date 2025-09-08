'use client';

import React, { useState } from 'react';

import { Combobox, IComboBoxOptions } from '@/app/_components/ui/combobox';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { NumericFormat } from 'react-number-format';
import { Button } from '@/app/_components/ui/button';
import { PlusCircleIcon, PlusIcon } from 'lucide-react';
import { TProduct } from '@/app/products/_components/columns';
import ProductToSaleTable from './products-to-sale-table';

interface IUpsertSheetContentProps {
  title: string;
  description: string;
  options: IComboBoxOptions[];
  products: TProduct[];
}

const formSchema = z.object({
  productId: z.uuid(),
  quantity: z.int().positive(),
});

type TFormSchema = z.infer<typeof formSchema>;

export interface IAddedProduct {
  name: string;
  id: string;
  price: number;
  quantity: number;
}

const UpsertSheetContent = ({
  title,
  description,
  options,
  products,
}: IUpsertSheetContentProps) => {
  const [addedProducts, setAddedProducts] = useState<IAddedProduct[]>([]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: '',
      quantity: 1,
    },
  });

  const onSubmit = (data: TFormSchema) => {
    const isProductAdded = addedProducts.find(
      (item) => item.id === data.productId
    );

    if (isProductAdded) {
      return setAddedProducts(
        addedProducts.map((item) => ({
          ...item,
          quantity: item.quantity + data.quantity,
        }))
      );
    }

    const product = products.filter((item) => item.id === data.productId)[0];

    setAddedProducts((current) => [
      ...current,
      {
        name: product.name,
        price: product.price,
        id: product.id,
        quantity: data.quantity,
      },
    ]);

    form.reset();
  };

  return (
    <SheetContent className='!max-w-[700px]'>
      <SheetHeader>
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription>{description}</SheetDescription>
      </SheetHeader>

      <div className='w-full space-y-8 px-4'>
        <Form {...form}>
          <form
            className='flex flex-col gap-8'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name='productId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione um produto</FormLabel>
                  <FormControl>
                    <Combobox
                      options={options}
                      placeholder='Procure um produto...'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className='hidden'>Produto</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade</FormLabel>
                  <FormControl>
                    <NumericFormat
                      allowNegative={false}
                      customInput={Input}
                      onValueChange={(value) =>
                        field.onChange(value.floatValue)
                      }
                      {...field}
                      onChange={() => {}}
                    />
                  </FormControl>
                  <FormDescription className='hidden'>
                    Quantidade do produto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>
              <PlusCircleIcon />
              Adicionar produto
            </Button>
          </form>
        </Form>
        <ProductToSaleTable addedProducts={addedProducts} />
      </div>
    </SheetContent>
  );
};
export default UpsertSheetContent;
