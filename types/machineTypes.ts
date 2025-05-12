export interface MachineResponse {
  status: number;
  message: string;
  payload: Machine[];
}

export interface Machine {
  id: number;
  machine_kind: string;
  machine_make: string;
  machine_type: string;
  other_machine_make: string;
  other_machine_type: string;
  machine_info1: string;
  machine_info2: string;
  machine_id: string;
  unit_id: number;
  customer_id: number;
  parts: Part[];
  unit: Unit;
}

export interface Part {
  id: number;
  analysis_type: string;
  part_kind: string;
  part_make: string;
  part_type: string;
  bi_carbunation: boolean;
  other_part_make: string;
  other_part_type: string;
  part_info: string;
  part_id: string;
  capacity_in_ltrs: number | null;
  machine_id: number;
}

export interface Unit {
  unit_name: string;
}