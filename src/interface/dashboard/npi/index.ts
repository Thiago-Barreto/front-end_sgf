export interface NpiData {
  DateCreate: string;
  UserCreate: number;
  arrival_of_mp_and_fixture: string;
  code: string;
  date_of_the_month: string;
  description: string;
  engineering_pilot_status: string;
  estimated_engineering_pilot_date: string;
  estimated_pilot_production_date: string;
  family: string;
  halb: string;
  id: number;
  justification_engineering: null;
  justification_production: null;
  lote_and_fixture: string;
  product_class: string;
  production_pilot_status: string;
  status: string;
  type_of_production: string;
  type_of_shipment: string;
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
