import z from 'zod';

export const updateSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.uuid('Invalid product ID.'),
      quantity: z
        .int('The quantity should be more than 0.')
        .positive('The quantity should be more than 0.'),
    })
  ),
  date: z.date('Invalid date.').optional(),
  saleId: z.uuid('Invalid sale ID.'),
});

export type TUpdateSaleSchema = z.infer<typeof updateSaleSchema>;
