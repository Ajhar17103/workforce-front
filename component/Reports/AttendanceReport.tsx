'use client';

import DynamicTable from '@/common/tables/DataTable';
import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Metric from './Component/Metric';

export default function AttendanceReport() {
  const [attendance, setAttendance] = useState<any[]>([]);

  useEffect(() => {
    setAttendance([
      {
        id: 1,
        name: 'Azharul Islam',
        checkIn: '09:02 AM',
        checkOut: '06:12 PM',
        status: <Badge bg="success">Regular</Badge>,
        duration: '9h 10m',
      },
      {
        id: 2,
        name: 'Rafi Rahman',
        checkIn: '09:30 AM',
        checkOut: '05:45 PM',
        status: <Badge bg="danger">Late</Badge>,
        duration: '8h 15m',
      },
      {
        id: 3,
        name: 'Sadia Akter',
        checkIn: '09:10 AM',
        checkOut: '06:05 PM',
        status: <Badge bg="info">On Leave</Badge>,
        duration: '-',
      },
    ]);
  }, []);

  return (
    <Metric
      title="Today's Attendance"
      value="3"
      icon="bi-kanban-fill"
      color="success"
    >
      <DynamicTable
        data={attendance}
        columns={[
          {
            label: 'Name',
            accessor: 'name',
            sortable: true,
            searchable: true,
            align: 'start',
          },
          {
            label: 'Check In',
            accessor: 'checkIn',
            sortable: false,
            searchable: false,
            align: 'center',
          },
          {
            label: 'Check Out',
            accessor: 'checkOut',
            sortable: false,
            searchable: false,
            align: 'center',
          },
          {
            label: 'Status',
            accessor: 'status',
            sortable: false,
            searchable: false,
            align: 'center',
          },
          {
            label: 'Duration',
            accessor: 'duration',
            sortable: false,
            searchable: false,
            align: 'center',
          },
        ]}
        action={false}
        pagination={true}
      />
    </Metric>
  );
}
