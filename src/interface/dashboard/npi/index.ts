export interface NpiData {
  id: number;
  code: string;
  description: string;
  family: string;
  halb: string;
  type_of_shipment: string;
  type_of_production: string;
  arrival_of_mp_and_fixture: string;
  lote_and_fixture: string;
  product_class: string;
  engineering_pilot_status: string;
  production_pilot_status: string;
  status: string;
  UserCreate: number;
  DateCreate: string;
  justification_engineering: string;
  justification_production: string;
  estimated_engineering_pilot_date: string;
  estimated_pilot_production_date: string;
  date_of_the_month: string;
}

export interface MonthData {
  Atrasado: number;
  Concluído: number;
  "Em Processo": number;
  month: string;
}

export interface YearCount {
  month: string;
  SSD: number;
  DDR: number;
  SMARTPHONE: number;
  TV: number;
  NOTEBOOK: number;
}

export interface DistinctFamiliesData {
  family: string;
}

export interface PerformanceData {
  result: number;
}

export interface DashboardNpiResponse {
  programming: NpiData[];
  resultMonth: MonthData[];
  monthlyCount: YearCount[];
  distinctFamilies: DistinctFamiliesData[];
  performance: PerformanceData[];
}
