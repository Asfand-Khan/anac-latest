export interface SampleReport {
  id: number;
  label: string;
  fe: string;
  pb: string;
  cu: string;
  sn: string;
  cr: string;
  al: string;
  ni: string;
  si: string;
  h2o: string;
  flash: string;
  soot_percent: string;
  b: string;
  na: string;
  v: string;
  li: string;
  ca: string;
  ba: string;
  zn: string;
  p: string;
  mg: string;
  mo: string;
  k: string;
  tbn: string;
  tan: string;
  v40: string;
  v100: string;
  paco_iso: string;
  paco_nas: string;
  oxp: string;
  nip: string;
  iph: string;
  appearence: string;
  acid_index: string;
  ag: string;
  created_at: string;
  updated_at: string;
}

export interface SampleReportResponse {
  status: number;
  message: string;
  payload: SampleReport[];
}