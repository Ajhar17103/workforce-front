'use client';

import DynamicTable from '@/common/tables/DataTable';
import { TableHead } from '@/types/common/TableHead';
import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Metric from './Component/Metric';

const column: TableHead<any>[] = [
  {
    label: 'Employee',
    accessor: 'name',
    sortable: true,
    searchable: true,
    align: 'start',
  },
  {
    label: 'Status',
    accessor: 'status',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Date',
    accessor: 'date',
    sortable: false,
    searchable: false,
    align: 'start',
  },
];

export default function ScrumReport() {
  const [standups, setStandups] = useState<any[]>([]);

  useEffect(() => {
    setStandups([
      {
        id: 1,
        name: 'Azharul Islam',
        status: (
          <>
            <Badge bg="success">Completed</Badge>
          </>
        ),
        date: '2025-10-07',
      },
      {
        id: 2,
        name: 'Rafi Rahman',
        status: (
          <>
            <Badge bg="warning">Pending</Badge>
          </>
        ),
        date: '2025-10-07',
      },
      {
        id: 3,
        name: 'Sadia Akter',
        status: (
          <>
            <Badge bg="success">Completed</Badge>
          </>
        ),
        date: '2025-10-07',
      },
    ]);
  }, []);

  return (
    <Metric
      title="Today's Scrum"
      value="3"
      icon="bi-people-fill"
      color="danger"
    >
      <DynamicTable
        data={standups}
        columns={column}
        action={false}
        pagination={true}
      />
    </Metric>
  );
}
