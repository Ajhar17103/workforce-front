import { commonOption, showWhen } from './CommonOption';

export type onChangeField = {
  id?: string;
  type?: string;
};

export type FormField = {
  column: number;
  align: string;
  label: string;
  labelVisibility?: 'visible' | 'hidden' | 'collapse' | 'initial' | 'inherit';
  fieldVisibility?: 'visible'|'hidden'|'collapse'|'initial'|'inherit';
  fieldName: string;
  dataType:|'text'|'textarea'|'dropdown'|'checkbox'|'date'|'number'|'email'|'image'|'password'|'multi-select';
  action: string | null;
  defaultValue: string | any;
  isEnum: boolean;
  enum: commonOption[];
  isRequired: boolean;
  showWhen?: showWhen[] | null;
  onChange?: string | null;
  disabled?: boolean;
};
