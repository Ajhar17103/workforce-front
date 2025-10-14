import { MetricType } from '@/types/report/metric.type';
import { Card } from 'react-bootstrap';

export default function Metric({
  title,
  value,
  icon,
  color,
  children,
}: MetricType) {
  return (
    <Card className="border-0 shadow-sm rounded-4">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center justify-content-between border-bottom pb-2 mb-3">
          <div>
            <div className="small text-muted">{title && title}</div>
            <h4 className="fw-bold mt-2">{value && value}</h4>
          </div>
          <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm icon-wrapper">
            <i className={`bi ${icon} fs-3 text-${color}`}></i>
          </div>
        </div>
        {children}
      </Card.Body>
    </Card>
  );
}
