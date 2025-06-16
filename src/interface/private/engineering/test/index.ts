export interface EquipmentData {
  id: number;
  serial: string;
  code_sap: string;
  description: string;
  family: string;
  brand: string;
  requiresCalibration: string;
  calibrationCertificate: string;
  invoice: string;
  dataInvoice: string;
  dischargeDate: string;
  shed: string;
  status: string;
  location: string;
  calibrationDate: string;
  nextCalibration: string;
}

export interface EquipmentResponse {
  equipments: EquipmentData[];
}
