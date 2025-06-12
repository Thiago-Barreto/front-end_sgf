import { z } from "zod";

export const NpiSchema = z.object({
  id: z.number(),
  code: z
    .string()
    .nonempty()
    .transform((data) => data.toLowerCase()),
  family: z.string(),
  description: z.string(),
  type_of_shipment: z.string(),
  type_of_production: z.string(),
  product_class: z.string(),
  lote_and_fixture: z.string(),
  arrival_of_mp_and_fixture: z.string(),
  halb: z.string(),
  estimated_engineering_pilot_date: z.string(),
  estimated_pilot_production_date: z.string(),
  status: z.string(),
  justification_engineering: z.string(),
  justification_production: z.string(),
  production_pilot_status: z.string(),
  engineering_pilot_status: z.string(),
  date_of_the_month: z.string(),
});

export const NpiWithoutId = NpiSchema.omit({ id: true });
export type NpiSearch = z.infer<typeof NpiWithoutId>;

export type NewProgrammingNpiType = z.infer<typeof NpiWithoutId>;
