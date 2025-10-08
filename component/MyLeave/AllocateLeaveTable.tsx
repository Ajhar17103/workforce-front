'use client';

import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { LeaveDto } from '@/types/my-leave/my-leave.type';
import { getMasterApiUrl } from '@/utils/api';
import { useEffect, useState } from 'react';
import { allocateTableSchema } from './MyLeaveSchema';

export default function AllocateLeaveTable() {
  const projectUrl = getMasterApiUrl('/projects');
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);
  const [tableData, setTableData] = useState<LeaveDto[]>([]);

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    // const transformed: LeaveDto[] = tasks?.map((t) => ({}));
    // setTableData(transformed);
  }, [tasks]);

  return (
    <DynamicTable
      data={[]}
      columns={allocateTableSchema}
      action={false}
      pagination={false}
    />
  );
}
