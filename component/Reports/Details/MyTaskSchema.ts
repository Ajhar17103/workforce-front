import { TableHead } from '@/types/common/TableHead';
import { TaskDto } from '@/types/task-board/task.type';

export const tableSchema: TableHead<TaskDto>[] = [
  {
    label: 'Name',
    accessor: 'name',
    sortable: false,
    searchable: true,
    align: 'start',
  },
  {
    label: 'Project',
    accessor: 'projectName',
    sortable: false,
    searchable: false,
    align: 'start',
  },
  {
    label: 'Sprint Name',
    accessor: 'sprintName',
    sortable: false,
    searchable: false,
    align: 'start',
  },
  {
    label: 'Task Type',
    accessor: 'taskType',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Priority',
    accessor: 'priority',
    sortable: false,
    searchable: false,
    align: 'center',
  },
];
