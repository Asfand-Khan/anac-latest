export type monthlyDataTypes = {
  month: string;
  value: number;
  isHighlighted?: boolean;
};

export interface MetricDataTypes {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}
