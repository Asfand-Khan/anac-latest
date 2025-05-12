interface Machine {
  id: number;
  machine_kind: string;
  machine_make: string;
  machine_type: string;
  other_machine_make: string | null;
  other_machine_type: string | null;
  machine_info1: string | null;
  machine_info2: string | null;
  machine_id: string | null;
  unit_id: number;
  customer_id: number;
}

export interface Unit {
  id: number;
  unit_code: string;
  unit_name: string;
  unit_contact: string;
  unit_address: string | null;
  unit_contact_person: string | null;
  customer_id: number;
  machines: Machine[];
}

export interface UnitResponse {
  status: number;
  message: string;
  payload: Unit[];
}