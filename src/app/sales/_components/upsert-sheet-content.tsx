'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, PlusCircleIcon } from 'lucide-react';
import React, {
  startTransition,
  useActionState,
  useMemo,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import z from 'zod';

import { TCreateSaleSchema } from '@/app/_actions/sale/create-sale/schema';
import { Button } from '@/app/_components/ui/button';
import { Combobox, IComboBoxOptions } from '@/app/_components/ui/combobox';
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
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet';
import { IProductDTO } from '@/app/_data-access/products/get-products';
import { ISaleProductDTO } from '@/app/_data-access/sale/get-sales';

import ProductToSaleTable from './products-to-sale-table';

interface IUpsertSheetContentProps {
  title: string;
  description: string;
  options: IComboBoxOptions[];
  products: IProductDTO[];
  salesProducts?: ISaleProductDTO[];
  endButtonLabel: string;
  onSaveSale: (data: TCreateSaleSchema) => Promise<void>;
}

const formSchema = z.object({
  productId: z.uuid('Produto não pode ser vazio.'),
  quantity: z
    .int('Deve haver pelo menos um produto.')
    .positive('Deve haver pelo menos um produto.'),
});

type TFormSchema = z.infer<typeof formSchema>;

export interface IAddedProduct {
  name: string;
  id: string;
  unitPrice: number;
  quantity: number;
}

const UpsertSheetContent = ({
  title,
  description,
  options,
  products,
  salesProducts,
  endButtonLabel,
  onSaveSale,
}: IUpsertSheetContentProps) => {
  const [addedProducts, setAddedProducts] = useState<IAddedProduct[]>(
    salesProducts?.map((item) => ({
      name: item.product.name,
      unitPrice: item.unitPrice,
      id: item.productId,
      quantity: item.quantity,
    })) || []
  );
  const [, saveSale, isPending] = useActionState(async () => {
    await onSaveSale({ products: addedProducts });
    setAddedProducts([]);
  }, null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: '',
      quantity: 1,
    },
    shouldUnregister: true,
  });

  const onSubmit = (data: TFormSchema) => {
    const productAdded = addedProducts.find(
      (item) => item.id === data.productId
    );

    const product = products.filter((item) => item.id === data.productId)[0];
    let { stock } = product;

    const productAlreadyAdded = salesProducts?.find(
      (item) => item.productId === data.productId
    );
    if (productAdded) {
      let isProductOutOfStock = productAdded.quantity + data.quantity > stock;

      if (productAlreadyAdded) {
        isProductOutOfStock =
          productAdded.quantity + data.quantity >
          stock + productAlreadyAdded.quantity;
        stock += productAlreadyAdded.quantity;
      }

      if (isProductOutOfStock) {
        return form.setError('quantity', {
          message: `Quantidade indisponível em estoque. Há somente ${stock} peças desse produto.`,
        });
      }

      form.reset();
      return setAddedProducts(
        addedProducts.map((item) => ({
          ...item,
          quantity: item.quantity + data.quantity,
        }))
      );
    }

    if (productAlreadyAdded) {
      stock += productAlreadyAdded.quantity;
    }

    const isProductOutOfStock = data.quantity > stock;
    if (isProductOutOfStock) {
      return form.setError('quantity', {
        message: `Quantidade indisponível em estoque. Há somente ${stock} peças desse produto.`,
      });
    }

    form.reset();
    setAddedProducts((currentProducts) => [
      ...currentProducts,
      {
        name: product.name,
        unitPrice: product.price,
        id: product.id,
        quantity: data.quantity,
      },
    ]);
  };

  const handleDeleteProduct = (productId: string) => {
    setAddedProducts((current) => {
      return current.filter((item) => item.id !== productId);
    });
  };

  const onCloseSheet = () => {
    setAddedProducts([]);
  };

  const handleFinalizeSale = () => {
    startTransition(saveSale);
  };

  const productIdField = form.watch('productId');
  const selectedProduct = useMemo(() => {
    const product = products.find((item) => item.id === productIdField);

    return product;
  }, [productIdField, products]);

  const labelWithQuantityInStock = useMemo(() => {
    if (!selectedProduct) {
      return '';
    }

    let quantityInStock = selectedProduct.stock;

    const productAlreadyAddedToList = addedProducts.find(
      (item) => item.id === productIdField
    );
    const productAlreadyAddedToSale = salesProducts?.find(
      (item) => item.productId === productIdField
    );

    quantityInStock =
      quantityInStock -
      (productAlreadyAddedToList?.quantity || 0) +
      (productAlreadyAddedToSale?.quantity || 0);

    if (selectedProduct.status === 'IN_STOCK') {
      return (
        <span className='text-green-500'>
          {' '}
          • {quantityInStock} ainda disponível
        </span>
      );
    }
    return <span className='text-red-500'>Fora de estoque</span>;
  }, [selectedProduct]);

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
                  <FormLabel>Quantidade {labelWithQuantityInStock}</FormLabel>
                  <FormControl>
                    <NumericFormat
                      disabled={
                        !selectedProduct ||
                        selectedProduct.status !== 'IN_STOCK'
                      }
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
        <ProductToSaleTable
          handleDeleteProduct={handleDeleteProduct}
          addedProducts={addedProducts}
        />
      </div>
      <SheetFooter className='flex w-full flex-row gap-2'>
        <SheetClose
          className='flex-1'
          asChild
        >
          <Button
            onClick={onCloseSheet}
            variant='secondary'
          >
            Cancelar
          </Button>
        </SheetClose>
        <Button
          onClick={handleFinalizeSale}
          className='flex flex-1 flex-row items-center gap-2 bg-green-500 hover:bg-green-600'
          disabled={isPending || addedProducts.length === 0}
        >
          {isPending && <Loader2Icon className='animate:spin' />}
          {endButtonLabel}
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};
export default UpsertSheetContent;
