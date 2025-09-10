import {
  ClipboardIcon,
  EllipsisIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

import { excludeProduct } from '@/app/_actions/product/exclude-product';
import { upsertProduct } from '@/app/_actions/product/upsert-product';
import { TUpsertProductSchema } from '@/app/_actions/product/upsert-product/schema';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog';
import { Button } from '@/app/_components/ui/button';
import { Dialog, DialogTrigger } from '@/app/_components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';

import { EditProductDialog } from './edit-product-dialog';
import ExcludeAlertDialog from './exclude-alert-dialog';
import { IProductDTO } from '@/app/_data-access/products/get-products';

interface IOptionsDropdownProps {
  product: IProductDTO;
}

const OptionsDropdown = ({ product }: IOptionsDropdownProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(product.id);
  };

  const handleExcludeProduct = async () => {
    try {
      const data = await excludeProduct({ id: product.id });
      toast.success('Produto excluído com sucesso');
    } catch (err) {
      toast.error('Erro ao excluir o produto.');
    }
  };

  const handleEditProduct = async (data: TUpsertProductSchema) => {
    try {
      await upsertProduct({
        ...data,
        id: product.id,
      });
      setIsDialogOpen(false);
      toast('Produto editado com sucesso.');
    } catch (err) {
      console.log(err);
      toast('Erro ao editar o produto.');
    }
  };

  return (
    <Dialog
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
              <DialogTrigger>
                <SquarePenIcon />
                Editar
              </DialogTrigger>
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

        <ExcludeAlertDialog handleExcludeProduct={handleExcludeProduct} />
      </AlertDialog>

      <EditProductDialog
        product={product}
        handleEditProduct={handleEditProduct}
      />
    </Dialog>
  );
};
export default OptionsDropdown;
