import { FormField } from '@/types/common/FormField';

export const departmentFormSchema: FormField[] = [
  {
    column: 12,
    align: 'default',
    label: 'Department',
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
