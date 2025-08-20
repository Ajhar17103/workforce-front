import { FormField } from '@/types/common/FormField';
import { TableHead } from '@/types/common/TableHead';
import { DesignationDto } from '@/types/master-data/designationt.type';

export const designationFormSchema: FormField[] = [
  {
    column: 6,
    align: 'default',
    label: 'Department',
    labelVisibility: 'visible',
    fieldName: 'departmentId',
    dataType: 'dropdown',
    action: null,
    defaultValue: '',
    isEnum: true,
    enum: [],
    isRequired: true,
  },
  {
    column: 6,
    align: 'default',
    label: 'Designation',
    labelVisibility: 'visible',
    fieldName: 'name',
    dataType: 'text',
    action: null,
    defaultValue: '',
    isEnum: false,
    enum: [],
    isRequired: true,
  },
];


export const designationTableSchema: TableHead <DesignationDto>[] = [
          {
            label: 'Department Name',
            accessor: 'departmentName',
            sortable: true,
            searchable: true,
            align: 'start',
          },
          {
            label: 'Name',
            accessor: 'name',
            sortable: true,
            searchable: true,
            align: 'start',
          },
        ]