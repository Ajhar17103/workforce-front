'use client';

import Form from '@/common/forms/Form';
import { TaskParam, TaskUpdateProps } from '@/types/task-board/task.type';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { useForm } from 'react-hook-form';

export default function MyTaskView({
  schema,
  itemUpdate,
  closeModal,
}: TaskUpdateProps) {
  const {
    register,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<TaskParam>({
    defaultValues: getDefaultValues<TaskParam>(itemUpdate),
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
