import z from 'zod';

export const upsertProductSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().trim().min(1, {
    error: 'O nome do produto não pode ser vazio.',
  }),
  price: z.number('O preço deve ser um número').min(0.01, {
    error: 'O preço não pode ser 0',
  }),
  stock: z.int().positive('O estoque não pode ser negativo').min(0, {
    error: 'O estoque não pode ser negativo',
  }),
});

export type TUpsertProductSchema = z.infer<typeof upsertProductSchema>;
