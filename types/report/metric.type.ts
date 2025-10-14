export interface MetricType {
  title?: string;
  value?: string | number;
  icon?: string;
  color?: string;
  total?: string | number;
  progress?: string | number;
  hold?: string | number;
  completed?: string | number;
  children?: React.ReactNode;
}
