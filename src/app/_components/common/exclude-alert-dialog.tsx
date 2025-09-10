import React from 'react';

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/_components/ui/alert-dialog';
import { Button } from '@/app/_components/ui/button';

interface IExcludeAlertDialogProps {
  handleExcludeProduct: () => void;
  description: string;
}

export const ExcludeAlertDialog = ({
  handleExcludeProduct,
  description,
}: IExcludeAlertDialogProps) => {
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction asChild>
          <Button
            onClick={handleExcludeProduct}
            variant='destructive'
          >
            Excluir
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};
