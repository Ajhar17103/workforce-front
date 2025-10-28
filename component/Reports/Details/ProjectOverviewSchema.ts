import { TableHead } from '@/types/common/TableHead';

export const tableOverviewSchema: TableHead<any>[] = [
  {
    label: 'Task Tracker',
    accessor: 'name',
    sortable: false,
    searchable: false,
    align: 'start',
  },
  {
    label: 'Total',
    accessor: 'total',
    sortable: false,
    searchable: false,
    align: 'start',
  },
  {
    label: 'Open',
    accessor: 'open',
    sortable: false,
    searchable: false,
    align: 'start',
  },
  {
    label: 'Closed',
    accessor: 'closed',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Hold',
    accessor: 'hold',
    sortable: false,
    searchable: false,
    align: 'center',
  },
];

interface ProjectUserSpentTimeReportDto {
  id: string;
  userName: string;
  allocatedTime: number;
  spentTime: number;
}


export const tableTimeSpentSchema: TableHead<ProjectUserSpentTimeReportDto>[] = [
  {
    label: 'User',
    accessor: 'userName',
    sortable: false,
    searchable: false,
    align: 'start',
  },
  {
    label: 'Allocated Time (h)',
    accessor: 'allocatedTime',
    sortable: false,
    searchable: false,
    align: 'start',
  },
  {
    label: 'Spent Time (h)',
    accessor: 'spentTime',
    sortable: false,
    searchable: false,
    align: 'start',
  },
];
