'use client';

import Metric from '../Reports/Component/Metric';
import MetricBar from '../Reports/Component/MetricBar';

export default function ProjectReport() {
  const projectSummary = [
    { id: 1, name: 'Customer 360', total: 12, completed: 8 },
    { id: 2, name: 'Asset Workflow', total: 10, completed: 7 },
    { id: 3, name: 'APAMS 3.0', total: 14, completed: 12 },
    { id: 4, name: 'BNPPAMS', total: 102, completed: 18 },
    { id: 5, name: 'BNPIMS', total: 100, completed: 70 },
    { id: 6, name: 'WF', total: 150, completed: 12 },
  ];

  const calcPercent = (done: number, total: number) =>
    total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <Metric
      title="Projects"
      value={projectSummary?.length}
      icon="bi-briefcase-fill"
      color="primary"
    >
      {projectSummary.map((proj, i) => {
        const percent = calcPercent(proj.completed, proj.total);
        return <MetricBar title={proj?.name} value={percent} />;
      })}
    </Metric>
  );
}
