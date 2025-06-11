import { z } from "zod";

export const ModelsSchema = z.object({
  ID: z.number(),
  Nome: z.string().nonempty(),
  Cod_sap: z.string().nonempty(),
  Descricao: z.string().nonempty(),
  Status: z.string().nonempty(),
  Qtd_inner: z.string().nonempty(),
  Qtd_caixa: z.string().nonempty(),
  Peso_master: z.string().nonempty(),
  Peso_inner: z.string().nonempty(),
  Ean: z.string().nonempty(),
  Roteiro: z.string(),
  ProcessLevel: z.string().nonempty(),
  FamilyType: z.string().nonempty(),
  auxPcbaType: z.string().nonempty(),
  prefixSerial: z.string(),
});

export const ModelsWithoutId = ModelsSchema.omit({ ID: true });
export type ModelsSearch = z.infer<typeof ModelsWithoutId>;

export const ModelFormCreate = ModelsSchema.omit({ ID: true, Roteiro: true });
export type ModelsCreate = z.infer<typeof ModelFormCreate>;
