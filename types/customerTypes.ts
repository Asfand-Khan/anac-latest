interface Unit {
  unit_name: string;
}

export interface CustomerResponse {
  status: number;
  message: string;
  payload: Customer[];
}

export interface Customer {
  id: number;
  customer_code: string;
  customer_name: string;
  contact_no: string;
  address: string;
  contact_person: string | null;
  units: Unit[];
}