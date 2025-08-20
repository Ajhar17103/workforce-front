'use client';

import Form from '@/common/forms/Form';
import {
  ProjectParam,
  ProjectUpdateProps,
} from '@/types/master-data/project.type';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { useForm } from 'react-hook-form';

export default function ProjectFullView({
  schema,
  itemUpdate,
}: ProjectUpdateProps) {
  const {
    register,
    control,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: getDefaultValues<ProjectParam>(itemUpdate),
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
