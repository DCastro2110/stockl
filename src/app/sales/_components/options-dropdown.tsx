import {
  ClipboardIcon,
  EllipsisIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';

import { ExcludeAlertDialog } from '@/app/_components/common/exclude-alert-dialog';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog';
import { Button } from '@/app/_components/ui/button';
import { IComboBoxOptions } from '@/app/_components/ui/combobox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet';
import { ISaleDTO } from '@/app/_data-access/sale/get-sales';

import UpsertSheetContent from './upsert-sheet-content';

interface ISaleOptionsDropdownProps {
  sale: ISaleDTO;
}

export const SaleOptionsDropdown = ({ sale }: ISaleOptionsDropdownProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const products = useMemo(
    () => sale.SaleProducts.map(({ product }) => product),
    [sale]
  );
  const comboOptions: IComboBoxOptions[] = useMemo(
    () =>
      products.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [products]
  );

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sale.id);
  };

  const handleExcludeSale = async () => {};

  const handleEditSale = async () => {};

  return (
    <Sheet
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost'>
              <EllipsisIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='flex flex-row items-center gap-2'
              onClick={handleCopyToClipboard}
            >
              <ClipboardIcon /> Copiar ID
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className='flex flex-row items-center gap-2'
            >
              <SheetTrigger>
                <SquarePenIcon />
                Editar
              </SheetTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem
              asChild
              className='flex flex-row items-center gap-2'
            >
              <AlertDialogTrigger>
                <Trash2Icon />
                Excluir
              </AlertDialogTrigger>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <ExcludeAlertDialog
          description='Essa ação não pode ser desfeita. Esta venda será apagada para sempre.'
          handleExcludeProduct={handleExcludeSale}
        />
      </AlertDialog>
      <UpsertSheetContent
        description='Edite sua venda abaixo.'
        endButtonLabel='Salvar'
        onSaveSale={handleEditSale}
        products={products}
        title='Editar venda'
        options={comboOptions}
        salesProducts={sale.SaleProducts.map((saleProduct) => ({
          id: saleProduct.id,
          name: saleProduct.product.name,
          unitPrice: saleProduct.unitValue,
          quantity: saleProduct.quantity,
        }))}
      />
    </Sheet>
  );
};
