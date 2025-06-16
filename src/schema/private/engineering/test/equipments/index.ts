import { z } from "zod";

export const EquipmentSchema = z.object({
  id: z.number(),
  serial: z.string(),
  code_sap: z
    .string()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  description: z.string(),
  amountEqp: z.string(),
  family: z.string(),
  brand: z.string(),
  requiresCalibration: z.string(),
  calibrationCertificate: z.string(),
  invoice: z.string(),
  dataInvoice: z.string(),
  dischargeDate: z.string(),
  shed: z.string(),
  status: z.string(),
  location: z.string(),
  calibrationDate: z.string(),
  nextCalibration: z.string(),
});

export const EquipmentsWithoutId = EquipmentSchema.omit({ id: true });
export type EquipmentsType = z.infer<typeof EquipmentsWithoutId>;

export const EquipmentCreate = EquipmentSchema.omit({
  id: true,
  serial: true,
  requiresCalibration: true,
  calibrationCertificate: true,
  status: true,
  invoice: true,
  dataInvoice: true,
  dischargeDate: true,
  calibrationDate: true,
  nextCalibration: true,
});

export type EquipmentType = z.infer<typeof EquipmentCreate>;
