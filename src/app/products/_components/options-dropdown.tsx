import {
  ClipboardIcon,
  EllipsisIcon,
  SquarePenIcon,
  Trash2Icon,
} from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { excludeProduct } from '@/app/_actions/product/exclude-product';
import {
  AlertDialog,
  AlertDialogTrigger,
} from '@/app/_components/ui/alert-dialog';
import { Button } from '@/app/_components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/app/_components/ui/dropdown-menu';

import ExcludeAlertDialog from './exclude-alert-dialog';

interface IOptionsDropdownProps {
  productId: string;
}

const OptionsDropdown = ({ productId }: IOptionsDropdownProps) => {
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(productId);
  };

  const handleExcludeProduct = async () => {
    try {
      const product = await excludeProduct({ id: productId });
      toast.success('Produto excluído com sucesso');
    } catch (err) {
      toast.error('Erro ao excluir o produto.');
    }
  };

  return (
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
          <DropdownMenuItem className='flex flex-row items-center gap-2'>
            <SquarePenIcon />
            Editar
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
  );
};
export default OptionsDropdown;
