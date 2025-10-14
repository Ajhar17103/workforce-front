import { FormField } from '@/types/common/FormField';
import { TableHead } from '@/types/common/TableHead';
import { DailyScrumDto } from '@/types/daily-scrum/daily-scrum.type';

export const formSchema: FormField[] = [
  {
    column: 12,
    align: 'default',
    label: 'Standup',
    labelVisibility: 'visible',
    fieldName: 'description',
    dataType: 'textarea',
    action: null,
    defaultValue: '',
    isEnum: false,
    enum: [],
    isRequired: true,
    showWhen: null,
    onChange: null,
    disabled: false,
  },
  {
    column: 12,
    align: 'default',
    label: 'Any Challenge?',
    labelVisibility: 'visible',
    fieldName: 'challenge',
    dataType: 'textarea',
    action: null,
    defaultValue: '',
    isEnum: false,
    enum: [],
    isRequired: false,
    showWhen: null,
    onChange: null,
    disabled: false,
  },
];

export const tableSchema: TableHead<DailyScrumDto>[] = [
  {
    label: 'Date',
    accessor: 'date',
    sortable: true,
    searchable: true,
    align: 'start',
  },
  {
    label: 'Description',
    accessor: 'description',
    sortable: true,
    searchable: true,
    align: 'start',
  },
  {
    label: 'Challenge',
    accessor: 'challenge',
    sortable: true,
    searchable: true,
    align: 'start',
  },
];

export const tableListSchema: TableHead<DailyScrumDto>[] = [
  {
    label: 'User',
    accessor: 'userName',
    sortable: true,
    searchable: true,
    align: 'start',
  },
  {
    label: 'Date',
    accessor: 'date',
    sortable: true,
    searchable: true,
    align: 'start',
  },
  {
    label: 'description',
    accessor: 'description',
    sortable: true,
    searchable: true,
    align: 'start',
  },
];
