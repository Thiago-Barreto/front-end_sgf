export interface ModelsData {
  ID: number;
  Nome: string;
  Cod_sap: string;
  Descricao: string;
  Status: string;
  Qtd_inner: number;
  Qtd_caixa: number;
  Peso_master: number;
  Peso_inner: number;
  Ean: string;
  Roteiro: string;
  ProcessLevel: string;
  FamilyType: string;
  auxPcbaType: string;
  prefixSerial: string;
  createUser: number;
  createDate: string;
}

export interface ModelsResponse {
  models: ModelsData[];
  message: string;
  title: string;
}
