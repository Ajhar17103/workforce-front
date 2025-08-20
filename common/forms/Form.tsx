'use client';

import { FormField } from '@/types/common/FormField';
import { formatDate } from '@/utils/formatDate';
import { useEffect, useRef, useState } from 'react';
import { Controller, UseFormResetField, useWatch } from 'react-hook-form';
import StateManagedSelect from 'react-select';

type Props = {
  schema: FormField[];
  register: any;
  control: any;
  errors: Record<string, any>;
  resetField: UseFormResetField<any>;
  setOnchangeType?: any;
};

export default function Form({
  schema,
  register,
  control,
  errors,
  resetField,
  setOnchangeType,
}: Props) {
  const values = useWatch({ control });
  const prevVisibleFieldsRef = useRef<Set<string>>(new Set());
  const [showPassword, setShowPassword] = useState(false);

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

  const handleOnChange = (e: any, field: any) => {
    setOnchangeType({
      id: e.target.value,
      type: field.onChange,
    });
  };
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
                onChange={(e: any) => handleOnChange(e, field)}
                disabled={field?.disabled ? field?.disabled : false}
              />
            )}

            {field.dataType === 'email' && (
              <input
                type="email"
                defaultValue={field.defaultValue}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-control"
                onChange={(e: any) => handleOnChange(e, field)}
                disabled={field?.disabled ? field?.disabled : false}
              />
            )}

            {field.dataType === 'textarea' && (
              <textarea
                defaultValue={field.defaultValue}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-control"
                onChange={(e: any) => handleOnChange(e, field)}
                disabled={field?.disabled ? field?.disabled : false}
              />
            )}

            {field.dataType === 'number' && (
              <input
                type="number"
                defaultValue={field.defaultValue}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-control"
                onChange={(e: any) => handleOnChange(e, field)}
                disabled={field?.disabled ? field?.disabled : false}
              />
            )}

            {field.dataType === 'date' && (
              <input
                type="date"
                defaultValue={formatDate(field.defaultValue, 'yyyy-MM-dd')}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-control"
                onChange={(e: any) => handleOnChange(e, field)}
                disabled={field?.disabled ? field?.disabled : false}
              />
            )}

            {field.dataType === 'image' && (
              <input
                type="file"
                defaultValue={field.defaultValue}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-control"
                onChange={(e: any) => handleOnChange(e, field)}
                disabled={field?.disabled ? field?.disabled : false}
              />
            )}

            {field.dataType === 'dropdown' && (
              <select
                defaultValue={field.defaultValue}
                {...register(field.fieldName, { required: field.isRequired })}
                className="form-select"
                onClick={(e: any) => handleOnChange(e, field)}
                disabled={field?.disabled ? field?.disabled : false}
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
                  onChange={(e: any) => handleOnChange(e, field)}
                  disabled={field?.disabled ? field?.disabled : false}
                />
                <label
                  className="form-check-label"
                  htmlFor={`checkbox-${field.fieldName}`}
                >
                  {field.label}
                </label>
              </div>
            )}
            {field.dataType === 'password' && (
              <div className="position-relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  defaultValue={field.defaultValue}
                  {...register(field.fieldName, { required: field.isRequired })}
                  className="form-control pe-5"
                  onChange={(e: any) => handleOnChange(e, field)}
                  disabled={field?.disabled ? field?.disabled : false}
                />
                <button
                  type="button"
                  className="btn btn-link position-absolute top-50 end-0 translate-middle-y p-0 me-2"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  <i
                    className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                  ></i>
                </button>
              </div>
            )}

            {field.dataType === 'multi-select' && (
              <Controller
                name={field.fieldName}
                control={control}
                defaultValue={field.defaultValue || []}
                rules={{ required: field.isRequired }}
                render={({ field: { onChange, value } }) => (
                  <StateManagedSelect
                    isMulti
                    options={field.enum.map((option) => ({
                      value: option.id,
                      label: option.name,
                    }))}
                    value={field.enum
                      .filter((option) => value.includes(option.id))
                      .map((option) => ({
                        value: option.id,
                        label: option.name,
                      }))}
                    onChange={(selected) =>
                      onChange(selected.map((s: any) => s.value))
                    }
                  />
                )}
              />
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
