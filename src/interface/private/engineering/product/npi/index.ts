export interface NpiData {
  id: number;
  code: string;
  family: string;
  description: string;
  type_of_shipment: string;
  type_of_production: string;
  product_class: string;
  lote_and_fixture: string;
  arrival_of_mp_and_fixture: string;
  halb: string;
  estimated_engineering_pilot_date: string;
  estimated_pilot_production_date: string;
  status: string;
  justification_engineering: string;
  justification_production: string;
  production_pilot_status: string;
  engineering_pilot_status: string;
  date_of_the_month: string;
}

export interface NpiResponse {
  npi: NpiData[];
  message: string;
  title: string;
}
