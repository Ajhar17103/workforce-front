import { MetricType } from '@/types/report/metric.type';
import { ProgressBar } from 'react-bootstrap';

export default function MetricBar({
  title,
  value,
  total,
  hold,
  completed,
  progress,
}: MetricType) {
  const calcPercent = (done: number, total: number) =>
    total === 0 ? 0 : Math.round((done / total) * 100);
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between small text-muted">
        <span>{title}</span>
        <span>{calcPercent(Number(completed), Number(total))}%</span>
      </div>
      <ProgressBar
        now={calcPercent(Number(completed), Number(total))}
        label={`Progress(${completed})`}
        variant="success"
        className="mb-2"
      />
      <ProgressBar
        now={calcPercent(Number(progress), Number(total))}
        label={`Todo Task(${progress})`}
        variant="primary"
        className="mb-2"
      />
      <ProgressBar
        now={calcPercent(Number(hold), Number(total))}
        label={`Hold Task${hold})`}
        variant="danger"
        className="mb-2"
      />
      <ProgressBar
        now={calcPercent(Number(total), Number(total))}
        label={`Total Task(${total})`}
        variant="info"
        className="mb-2"
      />
    </div>
  );
}
