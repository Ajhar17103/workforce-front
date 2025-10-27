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
