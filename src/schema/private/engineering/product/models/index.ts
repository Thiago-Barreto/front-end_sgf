import { z } from "zod";

export const ModelsSchema = z.object({
  ID: z.number(),
  Nome: z
    .string()
    .nonempty()
    .trim()
    .transform((data) => data.toUpperCase()),
  Cod_sap: z
    .string()
    .nonempty()
    .trim()
    .transform((data) => data.toUpperCase()),
  Descricao: z
    .string()
    .nonempty()
    .trim()
    .transform((data) => data.toUpperCase()),
  Status: z
    .string()
    .nonempty()
    .transform((data) => data.toUpperCase()),
  Qtd_inner: z.string().nonempty().trim(),
  Qtd_caixa: z.string().nonempty().trim(),
  Peso_master: z.string().nonempty().trim(),
  Peso_inner: z.string().nonempty().trim(),
  Ean: z
    .string()
    .nonempty()
    .trim()
    .transform((data) => data.toUpperCase()),
  Roteiro: z
    .string()
    .trim()
    .transform((data) => data.toUpperCase()),
  ProcessLevel: z
    .string()
    .nonempty()
    .trim()
    .transform((data) => data.toUpperCase()),
  FamilyType: z
    .string()
    .nonempty()
    .trim()
    .transform((data) => data.toUpperCase()),
  auxPcbaType: z
    .string()
    .nonempty()
    .trim()
    .transform((data) => data.toUpperCase()),
  prefixSerial: z.string().transform((data) => data.toUpperCase()),
});

export const ModelsWithoutId = ModelsSchema.omit({ ID: true });
export type ModelsSearch = z.infer<typeof ModelsWithoutId>;

export const ModelFormCreate = ModelsSchema.omit({
  ID: true,
  Roteiro: true,
  prefixSerial: true,
  Status: true,
});
export type ModelsCreate = z.infer<typeof ModelFormCreate>;

export const ModelsUpdateForm = ModelsSchema.omit({
  prefixSerial: true,
  Roteiro: true,
});

export type ModelsTypeUpdate = z.infer<typeof ModelsUpdateForm>;
