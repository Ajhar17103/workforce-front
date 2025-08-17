import { FormField } from '@/types/common/FormField';

export const projectFormSchema: FormField[] = [
  {
    column: 12,
    align: 'default',
    label: 'Role',
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
