'use client';

import Form from '@/common/forms/Form';
import {
  LeaveRequestParam,
  LeaveUpdateProps,
} from '@/types/my-leave/my-leave.type';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { useForm } from 'react-hook-form';

export default function LeaveRequestView({
  schema,
  itemUpdate,
  closeModal,
}: LeaveUpdateProps) {
  const {
    register,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<LeaveRequestParam>({
    defaultValues: getDefaultValues<LeaveRequestParam>(itemUpdate),
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
