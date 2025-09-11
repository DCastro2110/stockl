import z from 'zod';

export const deleteSaleSchema = z.object({
  id: z.uuid('ID inválido.'),
});

export type TDeleteSaleSchema = z.infer<typeof deleteSaleSchema>;
