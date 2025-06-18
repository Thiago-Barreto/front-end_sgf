export interface MvEquipmentData {
  id: number;
  id_code: number;
  user_exit: number;
  date_exit: string;
  status: string;
  line: string;
  shed: string;
  user_return: number;
  date_return: string;
}

export interface ReturnEquipmentsData {
  message: string;
  actives: MvEquipmentData[];
}
