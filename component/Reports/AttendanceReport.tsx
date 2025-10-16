'use client';

import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDailyAttendanceReport } from '@/redux/slices/reportSlice';
import { TableHead } from '@/types/common/TableHead';
import { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Metric from './Component/Metric';

interface AttendanceSummary {
  id: string;
  userId: string;
  userName: string;
  designationId?: string;
  designationName?: string;
  checkInTime: string;
  checkOutTime: string;
  status: any;
  duration: string;
}

const tableColumns: TableHead<AttendanceSummary>[] = [
  {
    label: 'Name',
    accessor: 'userName',
    sortable: true,
    searchable: true,
    align: 'start',
  },
  {
    label: 'Check In',
    accessor: 'checkInTime',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Check Out',
    accessor: 'checkOutTime',
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
];

export default function AttendanceReport() {
  const dispatch = useAppDispatch();
  const { dailyAttendanceReport, loading, error } = useAppSelector(
    (state) => state.reports,
  );
  const [attendanceSummary, setAttendanceSummary] = useState<
    AttendanceSummary[]
  >([]);

  useEffect(() => {
    dispatch(fetchDailyAttendanceReport());
  }, [dispatch]);

  useEffect(() => {
    if ((dailyAttendanceReport?.length ?? 0) > 0) {
      const attendanceData: AttendanceSummary[] = dailyAttendanceReport!.map(
        (ar: AttendanceSummary) => {
          return {
            id: ar?.id,
            userId: ar?.userId,
            userName: ar?.userName,
            checkInTime: ar?.checkInTime,
            checkOutTime: ar?.checkOutTime,
            status: getStatusBadge(ar?.status),
            duration: ar?.duration,
          };
        },
      );

      setAttendanceSummary(attendanceData);
    }
  }, [dailyAttendanceReport]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'REGULAR':
        return <Badge bg="success">Regular</Badge>;
      case 'LATE':
        return <Badge bg="warning">Late</Badge>;
      case 'ON_LEAVE':
        return <Badge bg="info">On Leave</Badge>;
      case 'ABSENT':
        return <Badge bg="danger">Absent</Badge>;
      default:
        return <Badge bg="secondary">Unknown</Badge>;
    }
  };

  return (
    <Metric
      title="Today's Attendance"
      value="3"
      icon="bi-kanban-fill"
      color="success"
    >
      <DynamicTable
        data={attendanceSummary}
        columns={tableColumns}
        action={false}
        pagination={true}
      />
    </Metric>
  );
}
