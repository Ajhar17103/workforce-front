'use client';

import DynamicTable from '@/common/tables/DataTable';
import { TableHead } from '@/types/common/TableHead';
import Metric from '../Reports/Component/Metric';

const column: TableHead<any>[] = [
  {
    label: 'Project',
    accessor: 'project',
    sortable: true,
    searchable: true,
    align: 'start',
  },
  {
    label: 'Active',
    accessor: 'active',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Completed',
    accessor: 'completed',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Progress',
    accessor: 'progress',
    sortable: false,
    searchable: false,
    align: 'center',
  },
];

export default function SprintReport() {
  const sprintSummary: any[] = [
    { id: 1, project: 'BNPPAMS', active: 2, completed: 4, progress: 70 },
    { id: 2, project: 'Asset Workflow', active: 1, completed: 2, progress: 60 },
    { id: 3, project: 'APAMS 3.0', active: 3, completed: 3, progress: 80 },
  ];

  return (
    <Metric
      title="Sprints"
      value="3"
      icon="bi-lightning-charge-fill"
      color="info"
    >
      <DynamicTable
        data={sprintSummary}
        columns={column}
        action={false}
        pagination={true}
      />
    </Metric>
  );
}
