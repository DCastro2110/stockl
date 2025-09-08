'use client';

import React from 'react';

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

interface IUpsertSheetContentProps {
  title: string;
  description: string;
  options: IComboBoxOptions[];
}

const formSchema = z.object({
  product: z.uuid(),
  quantity: z.int().positive(),
});

type TFormSchema = z.infer<typeof formSchema>;

const UpsertSheetContent = ({
  title,
  description,
  options,
}: IUpsertSheetContentProps) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product: '',
      quantity: 1,
    },
  });

  return (
    <SheetContent>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>

        <div className='w-full px-4'>
          <Form {...form}>
            <form
              className='flex flex-col gap-8'
              onSubmit={form.handleSubmit(() => console.log('oi'))}
            >
              <FormField
                control={form.control}
                name='product'
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
                    <FormDescription className='hidden'>
                      Produto
                    </FormDescription>
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
            </form>
          </Form>
        </div>
      </SheetContent>
    </SheetContent>
  );
};
export default UpsertSheetContent;
