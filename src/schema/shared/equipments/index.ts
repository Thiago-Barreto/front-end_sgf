import { z } from "zod";

export const EquipmentSchema = z.object({
  id: z.number(),
  serial: z.string(),
  code_sap: z
    .string()
    .trim()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  invoice: z
    .string()
    .trim()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  dataInvoice: z.string(),
  description: z
    .string()
    .max(80, "Máximo de 80 caracteres")
    .trim()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  family: z
    .string()
    .trim()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  product: z
    .string()
    .trim()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  amount: z.string().trim().nonempty(""),
  brand: z
    .string()
    .trim()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  requiresCalibration: z.string(),
  calibrationCertificate: z.string(),
  dischargeDate: z.string(),
  shed: z
    .string()
    .trim()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  status: z.string(),
  location: z
    .string()
    .trim()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
  calibrationDate: z.string(),
  nextCalibration: z.string(),
  amountEqp: z
    .string()
    .trim()
    .nonempty("")
    .transform((data) => data.toUpperCase()),
});

export const EquipmentsWithoutId = EquipmentSchema.omit({ id: true });
export type EquipmentsType = z.infer<typeof EquipmentsWithoutId>;

export const EquipmentCreate = EquipmentSchema.omit({
  id: true,
  serial: true,
  calibrationCertificate: true,
  status: true,
  dischargeDate: true,
  dataInvoice: true,
  calibrationDate: true,
  nextCalibration: true,
});

export type EquipmentCreateType = z.infer<typeof EquipmentCreate>;

export const EquipmentUpdateForm = EquipmentSchema.omit({
  serial: true,
  calibrationDate: true,
  dischargeDate: true,
  dataInvoice: true,
  amountEqp: true,
});

export type EquipmentUpdateType = z.infer<typeof EquipmentUpdateForm>;

export const MovementSchema = EquipmentSchema.omit({
  code_sap: true,
  invoice: true,
  dataInvoice: true,
  family: true,
  product: true,
  amount: true,
  brand: true,
  requiresCalibration: true,
  calibrationCertificate: true,
  dischargeDate: true,
  status: true,
  location: true,
  calibrationDate: true,
  nextCalibration: true,
  amountEqp: true,
  shed: true,
}).extend({
  serial: z.string(),
  description: z.string(),
  line: z.string().transform((data) => data.toUpperCase()),
  shedOrLine: z.string().nonempty(""),
  user_return: z.string(),
  shed: z.string().transform((data) => data.toUpperCase()),
  details: z.string().transform((data) => data.toUpperCase()),
});

export type MovementsType = z.infer<typeof MovementSchema>;
