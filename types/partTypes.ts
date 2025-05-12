export interface PartResponse {
  status: number;
  message: string;
  payload: Part[];
}

export interface Part {
  id: number;
  analysis_type: string;
  part_kind: string;
  part_make: string;
  part_type: string;
  bi_carbunation: boolean;
  other_part_make: string | null;
  other_part_type: string | null;
  part_info: string | null;
  part_id: string | null;
  capacity_in_ltrs: number | null;
  machine_id: number;
}