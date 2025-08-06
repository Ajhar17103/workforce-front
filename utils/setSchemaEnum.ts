import { commonOption } from "@/types/common/CommonOption";
import { FormField } from "@/types/common/FormField";

/**
 * Dynamically set enum values in the form schema.
 * @param schema Original form schema
 * @param fieldName Name of the field to update
 * @param enumValues Array of enum options (usually string[])
 * @returns New schema with updated enum values
 */
export function setSchemaEnum(
 schema: FormField[],
  enumMap: Record<string, commonOption[]>
): FormField[] {
  return schema.map((field) =>
    enumMap[field.fieldName]
      ? {
          ...field,
          enum: enumMap[field.fieldName],
          isEnum: true,
        }
      : field
  );
}
