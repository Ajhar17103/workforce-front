import { FormField } from "@/types/common/FormField";

/**
 * Dynamically set default values in the form schema.
 * @param schema Original form schema
 * @param fieldName Name of the field to update
 * @param defaultValue object of value (usually string[])
 * @returns New schema with updated  values
 */

export function setSchemaDefaultValue<T>(
  schema: FormField[],
  item: Partial<T>
): FormField[] {
  return schema.map((field) => {
    const value = item?.[field.fieldName as keyof T];
    return value !== undefined
      ? { ...field, defaultValue: value }
      : field;
  });
}
