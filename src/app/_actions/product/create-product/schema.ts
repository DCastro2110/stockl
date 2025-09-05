import z from 'zod';

export const createProductSchema = z.object({
  name: z.string().trim().min(1, {
    error: 'O nome do produto não pode ser vazio.',
  }),
  price: z.number('O preço deve ser um número').min(0.01, {
    error: 'O preço não pode ser 0',
  }),
  stock: z
    .number('O estoque deve ser um número')
    .int()
    .positive('O estoque não pode ser negativo')
    .min(0, {
      error: 'O estoque não pode ser negativo',
    }),
});

export type TCreateProductSchema = z.infer<typeof createProductSchema>;
