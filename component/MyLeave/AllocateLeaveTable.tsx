'use client';

import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAllocatedLeavesByUserId } from '@/redux/slices/allocatedLeaveSlice';
import { AllocatedLeaveDto } from '@/types/my-leave/my-leave.type';
import { getSessionStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { allocateTableSchema } from './MyLeaveSchema';

export default function AllLeaveTable() {
  const user_id = getSessionStorage('user_id');
  const dispatch = useAppDispatch();
  const { userAllocatedLeaves } = useAppSelector((state) => state.leave);
  const [tableData, setTableData] = useState<AllocatedLeaveDto[]>([]);

  useEffect(() => {
    if (user_id) {
      dispatch(fetchAllocatedLeavesByUserId(user_id));
    }
  }, [dispatch, user_id]);

  useEffect(() => {
    if (userAllocatedLeaves) {
      const transformed: AllocatedLeaveDto[] = [
        {
          id: userAllocatedLeaves?.id,
          userId: userAllocatedLeaves?.userId,
          userName: userAllocatedLeaves?.userName,
          fiscalYear: userAllocatedLeaves?.fiscalYear,
          totalSickLeave: userAllocatedLeaves?.totalSickLeave,
          takenSickLeave: userAllocatedLeaves?.takenSickLeave,
          totalCasualLeave: userAllocatedLeaves?.totalCasualLeave,
          takenCasualLeave: userAllocatedLeaves?.takenCasualLeave,
          totalAnnualLeave: userAllocatedLeaves?.totalAnnualLeave,
          takenAnnualLeave: userAllocatedLeaves?.takenAnnualLeave,
          paidLeave: userAllocatedLeaves?.paidLeave,
          sickLeave: `${userAllocatedLeaves?.takenSickLeave} / ${userAllocatedLeaves?.totalSickLeave}`,
          casualLeave: `${userAllocatedLeaves?.takenCasualLeave} / ${userAllocatedLeaves?.totalCasualLeave}`,
          annualLeave: `${userAllocatedLeaves?.takenAnnualLeave} / ${userAllocatedLeaves?.totalAnnualLeave}`,
        },
      ];
      setTableData(transformed);
    }
  }, [userAllocatedLeaves]);

  console.log('tableData', tableData);

  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={allocateTableSchema}
        action={false}
        pagination={false}
      />
    </div>
  );
}
