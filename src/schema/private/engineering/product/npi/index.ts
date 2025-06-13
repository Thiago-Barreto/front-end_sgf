import { z } from "zod";

export const NpiSchema = z.object({
  id: z.number(),
  code: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  family: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  description: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  type_of_shipment: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  type_of_production: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  product_class: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  halb: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  lote_and_fixture: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  arrival_of_mp_and_fixture: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  estimated_engineering_pilot_date: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  estimated_pilot_production_date: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  status: z.string(),
  production_pilot_status: z
    .enum(["Em Processo", "Atrasado", "Concluído"])
    .nullable(),
  justification_engineering: z.string().nullable(),
  engineering_pilot_status: z
    .enum(["Em Processo", "Atrasado", "Concluído"])
    .nullable(),
  justification_production: z.string().nullable(),
});

export const NpiWithoutId = NpiSchema.omit({
  id: true,
  status: true,
  justification_engineering: true,
  justification_production: true,
  production_pilot_status: true,
  engineering_pilot_status: true,
});

export type NpiSearch = z.infer<typeof NpiWithoutId>;

export type NewProgrammingNpiType = z.infer<typeof NpiWithoutId>;

export const NpiWithoutStatus = NpiSchema.omit({
  status: true,
});
export type UpdateProgrammingNpi = z.infer<typeof NpiWithoutStatus>;
