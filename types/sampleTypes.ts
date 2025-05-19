export interface SampleResponse {
  status: number;
  message: string;
  payload: Sample[];
}

export interface Sample {
  id: number;
  barcode_no: string;
  sample_date: string;
  intermediate_sample: boolean;
  total_mileage: number;
  mileage_unit: string;
  fluid_time: string;
  top_up: number;
  top_up_unit: string;
  fluid_name: string;
  fluid_make: string | null;
  fluid_type: string | null;
  fluid_grade: string | null;
  part_id: number;
  machine_id: number;
}