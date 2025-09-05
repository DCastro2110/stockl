import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import {
  createProductSchema,
  TCreateProductSchema,
} from '@/app/_actions/product/create-product/schema';
import { Button } from '@/app/_components/ui/button';
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
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

interface ICreateProductFormProps {
  onSubmit: (data: TCreateProductSchema) => void;
}

export const CreateProductForm = ({ onSubmit }: ICreateProductFormProps) => {
  const form = useForm({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      price: 1,
      stock: 0,
    },
    shouldUnregister: true,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do produto</FormLabel>
              <FormControl>
                <Input
                  placeholder='Insira o nome do produto'
                  {...field}
                />
              </FormControl>
              <FormDescription className='hidden'>
                Nome do produto a ser criado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='price'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preço do produto</FormLabel>
              <FormControl>
                <NumericFormat
                  allowNegative={false}
                  decimalSeparator=','
                  fixedDecimalScale
                  decimalScale={2}
                  prefix='R$ '
                  placeholder='Insira o valor do produto'
                  {...field}
                  customInput={Input}
                  onValueChange={(value) => field.onChange(value.floatValue)}
                  onChange={() => {}}
                />
              </FormControl>
              <FormDescription className='hidden'>
                Preço do produto a ser criado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='stock'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estoque do produto</FormLabel>
              <FormControl>
                <NumericFormat
                  decimalScale={0}
                  allowNegative={false}
                  customInput={Input}
                  placeholder='Insira a quantidade do produto'
                  {...field}
                  onValueChange={(value) => field.onChange(value.floatValue)}
                  onChange={() => {}}
                />
              </FormControl>
              <FormDescription className='hidden'>
                Estoque do produto a ser criado
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className='flex w-full justify-between!'>
          <Button
            className='flex-1 gap-2 bg-green-500'
            type='submit'
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Loader2Icon size={16} />}
            Cadastrar
          </Button>
          <DialogClose
            className='flex-1'
            asChild
          >
            <Button variant='secondary'>Cancelar</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};
