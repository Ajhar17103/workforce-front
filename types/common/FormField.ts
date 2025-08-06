import { commonOption } from "./CommonOption";

export type FormField = {
  column: number;
  align: string;
  label: string;
  labelVisibility: "visible" | "hidden" | "collapse" | "initial" | "inherit";
  fieldName: string;
  dataType: "text" | "textarea" | "dropdown" | "checkbox" | "date" | "number";
  action: string | null;
  defaultValue: any;
  isEnum: boolean;
  enum: commonOption[];
  isRequired: boolean;
};
