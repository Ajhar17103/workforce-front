import { MetricType } from '@/types/report/metric.type';
import { ProgressBar } from 'react-bootstrap';

export default function MetricBar({ title, value }: MetricType) {
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between small text-muted">
        <span>{title}</span>
        <span>{value}</span>
      </div>
      <ProgressBar now={Number(value)} style={{ height: '6px' }} />
    </div>
  );
}
