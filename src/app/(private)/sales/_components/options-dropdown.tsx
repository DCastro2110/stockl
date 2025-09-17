import {
  ClipboardIcon,
  EllipsisIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { TCreateSaleSchema } from '@/app/_actions/sale/create-sale/schema';
import { deleteSale } from '@/app/_actions/sale/delete-sale';
import { updateSale } from '@/app/_actions/sale/update-sale';
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
import { IProductDTO } from '@/app/_data-access/products/get-products';
import { ISaleDTO } from '@/app/_data-access/sale/get-sales';

import UpsertSheetContent from './upsert-sheet-content';

interface ISaleOptionsDropdownProps {
  sale: ISaleDTO;
  products: IProductDTO[];
  comboOptions: IComboBoxOptions[];
}

export const SaleOptionsDropdown = ({
  sale,
  products,
  comboOptions,
}: ISaleOptionsDropdownProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(sale.id);
  };

  const handleEditSale = async (data: TCreateSaleSchema) => {
    try {
      await updateSale({ ...data, saleId: sale.id });
      setIsSheetOpen(false);
      toast.success('Venda editada com sucesso.');
    } catch (err) {
      toast.error('Erro ao editar a venda.');
    }
  };

  const handleDeleteSale = async () => {
    try {
      await deleteSale({ id: sale.id });
      toast.success('Venda excluída com sucesso.');
    } catch (err) {
      toast.error('Erro ao excluir a venda.');
    }
  };

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={setIsSheetOpen}
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
          handleExcludeProduct={handleDeleteSale}
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
          unitPrice: saleProduct.unitPrice,
          quantity: saleProduct.quantity,
          productId: saleProduct.productId,
          product: saleProduct.product,
          saleId: saleProduct.saleId,
        }))}
      />
    </Sheet>
  );
};
