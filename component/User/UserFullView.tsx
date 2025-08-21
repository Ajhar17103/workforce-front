'use client';

import Form from '@/common/forms/Form';
import { UserParam, UserUpdateProps } from '@/types/master-data/user.type';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { useForm } from 'react-hook-form';

export default function UserFullView({ schema, itemUpdate }: UserUpdateProps) {
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

  return (
    <div className="bg-white rounded-bottom row g-3">
      <Form
        schema={schema}
        register={register}
        control={control}
        errors={errors}
        resetField={resetField}
      />
    </div>
  );
}
