'use client';

import { FormField } from '@/types/common/FormField';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useRef } from 'react';
import { UseFormResetField, useWatch } from 'react-hook-form';

type Props = {
  schema: FormField[];
  register: any;
  control: any;
  errors: Record<string, any>;
  resetField: UseFormResetField<any>;
};

export default function Form({
  schema,
  register,
  control,
  errors,
  resetField,
}: Props) {
  const values = useWatch({ control });
  const prevVisibleFieldsRef = useRef<Set<string>>(new Set());

  const isFieldVisible = (field: FormField) => {
    if (!field.showWhen) return true;
    const conditions = Array.isArray(field.showWhen)
      ? field.showWhen
      : [field.showWhen];
    return conditions.some((cond) => values[cond.field] === cond.value);
  };

  const visibleFields = schema.filter(isFieldVisible);
  const visibleFieldNames = new Set(visibleFields.map((f) => f.fieldName));

  useEffect(() => {
    const prevVisibleFields = prevVisibleFieldsRef.current;

    schema.forEach((field) => {
      if (field.showWhen) {
        const currentlyVisible = visibleFieldNames.has(field.fieldName);
        const wasVisible = prevVisibleFields.has(field.fieldName);
        if (wasVisible && !currentlyVisible) {
          resetField(field.fieldName);
        }
      }
    });

    prevVisibleFieldsRef.current = visibleFieldNames;
  }, [visibleFieldNames, schema, resetField]);
  return (
    <>
      {visibleFields.map((field, idx) => (
        <div key={idx} className={`col-md-${field.column}`}>
          <div className="mb-2">
            <label
              className="form-label fw-medium"
              style={{ visibility: field.labelVisibility }}
            >
              {field.label}
              {field.isRequired && <span className="text-danger ms-1">*</span>}
            </label>

            {field.dataType === 'text' && (
              <input
                type="text"
                defaultValue={field.defaultValue}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-control"
              />
            )}

            {field.dataType === 'textarea' && (
              <textarea
                defaultValue={field.defaultValue}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-control"
              />
            )}

            {field.dataType === 'number' && (
              <input
                type="number"
                defaultValue={field.defaultValue}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-control"
              />
            )}

            {field.dataType === 'date' && (
              <input
                type="date"
                defaultValue={formatDate(field.defaultValue, 'yyyy-MM-dd')}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-control"
              />
            )}

            {field.dataType === 'dropdown' && (
              <select
                defaultValue={field.defaultValue}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-select"
              >
                <option value="">--</option>
                {field.enum.map((option) => (
                  <option key={option.id} value={String(option.id)}>
                    {option.name}
                  </option>
                ))}
              </select>
            )}

            {field.dataType === 'checkbox' && (
              <div className="form-check mt-2">
                <input
                  type="checkbox"
                  defaultChecked={field.defaultValue}
                  {...register(field.fieldName)}
                  className="form-check-input"
                  id={`checkbox-${field.fieldName}`}
                />
                <label
                  className="form-check-label"
                  htmlFor={`checkbox-${field.fieldName}`}
                >
                  {field.label}
                </label>
              </div>
            )}

            {errors[field.fieldName] && (
              <div className="text-danger small mt-1">
                {errors[field.fieldName].message ||
                  `${field.label} is required`}
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
