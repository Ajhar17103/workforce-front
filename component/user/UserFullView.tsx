'use client';

import Form from '@/common/forms/Form';
import { useAppDispatch } from '@/redux/hooks';
import { UserParam, UserUpdateProps } from '@/types/master-data/user.type';
import { getMasterApiUrl } from '@/utils/api';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function UserFullView({
  schema,
  itemUpdate,
  closeModal,
  onChangeType,
  setOnchangeType,
  handleDepartmentChange,
}: UserUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<UserParam>({
    defaultValues: getDefaultValues<UserParam>(itemUpdate),
  });

  const userUrl = getMasterApiUrl('/users');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (onChangeType?.type === 'handleDepartmentChange' && onChangeType?.id) {
      handleDepartmentChange?.(onChangeType?.id);
    }
  }, [onChangeType]);

  const handleFormSubmit = (data: UserParam) => {};
  return (
    <div className="bg-white rounded-bottom row g-3">
      <Form
        schema={schema}
        register={register}
        control={control}
        errors={errors}
        resetField={resetField}
        setOnchangeType={setOnchangeType}
      />
    </div>
  );
}
