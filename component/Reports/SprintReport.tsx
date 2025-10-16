'use client';

import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchSprintReport } from '@/redux/slices/reportSlice';
import { TableHead } from '@/types/common/TableHead';
import { useEffect, useState } from 'react';
import Metric from '../Reports/Component/Metric';

interface UserTaskSummary {
  id: string;
  projectId: string;
  projectName: string;
  sprintType: string;
  startDate: string;
  endDate: string;
  totalSprintHrs: string;
  workingDays: string;
}

const tableColumns: TableHead<UserTaskSummary>[] = [
  {
    label: 'Project',
    accessor: 'projectName',
    sortable: true,
    searchable: true,
    align: 'start',
  },
  {
    label: 'Start Date',
    accessor: 'startDate',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'End Date',
    accessor: 'endDate',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Status',
    accessor: 'sprintType',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Total Sprint(Hrs)',
    accessor: 'totalSprintHrs',
    sortable: false,
    searchable: false,
    align: 'center',
  },
];

export default function SprintReport() {
  const dispatch = useAppDispatch();
  const { sprintReport, loading, error } = useAppSelector(
    (state) => state.reports,
  );
  const [sprintSummary, setSprintSummary] = useState<UserTaskSummary[]>([]);

  useEffect(() => {
    dispatch(fetchSprintReport());
  }, [dispatch]);

  useEffect(() => {
    if ((sprintReport?.length ?? 0) > 0) {
      const sprintData: UserTaskSummary[] = sprintReport!.map(
        (sr: UserTaskSummary) => {
          return {
            id: sr?.id,
            projectId: sr?.projectId,
            projectName: sr?.projectName,
            sprintType: sr?.sprintType,
            startDate: sr?.startDate,
            endDate: sr?.endDate,
            totalSprintHrs: sr?.totalSprintHrs,
            workingDays: sr?.workingDays,
          };
        },
      );

      setSprintSummary(sprintData);
    }
  }, [sprintReport]);

  return (
    <Metric
      title="Sprints"
      value="3"
      icon="bi-lightning-charge-fill"
      color="info"
    >
      <DynamicTable
        data={sprintSummary}
        columns={tableColumns}
        action={false}
        pagination={true}
        rowsPerPage={2}
      />
    </Metric>
  );
}
