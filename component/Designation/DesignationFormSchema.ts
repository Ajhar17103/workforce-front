import { FormField } from '@/types/common/FormField';

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
