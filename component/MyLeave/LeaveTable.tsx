'use client';

import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { LeaveDto } from '@/types/my-leave/my-leave.type';
import { getMasterApiUrl } from '@/utils/api';
import { useEffect, useState } from 'react';
import { tableSchema } from './MyLeaveSchema';

export default function LeaveTable() {
  const projectUrl = getMasterApiUrl('/projects');
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((state) => state.task);
  const [tableData, setTableData] = useState<LeaveDto[]>([]);

  useEffect(() => {}, [dispatch]);

  useEffect(() => {
    // const transformed: LeaveDto[] = tasks?.map((t) => ({}));
    // setTableData(transformed);
  }, [tasks]);
    const updateItem = async (item: LeaveDto) => {};

  return (
    <div>
      <DynamicTable
        data={[]}
        columns={tableSchema}
        action={true}
        pagination={true}
        onEdit={updateItem}
      />
    </div>
  );
}
