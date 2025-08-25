'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjects } from '@/redux/slices/projectSlice';
import { fetchSprints } from '@/redux/slices/sprintSlice';
import { FormField } from '@/types/common/FormField';
import {
  SprintParam,
  SprintUpdateProps,
} from '@/types/master-data/sprint.type';
import { getMasterApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { formSchema as baseSchema } from './SprintSchema';

export default function SpringCreate({ closeModal }: SprintUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<SprintParam>();

  const sprintUrl = getMasterApiUrl('/sprints');
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (projects) {
      const projectId = projects.map((user) => ({
        id: user.id,
        name: user.name,
      }));

      const enumMap = {
        projectId: projectId,
      };

      const finalSchema = setSchemaEnum(baseSchema, enumMap);
      setSchema(finalSchema);
    }
  }, [projects]);

  const handleFormSubmit = (data: SprintParam) => {
    console.log(data);
    const postData = {
      projectId: data?.projectId,
      name: data?.name,
      startDate: data?.startDate,
      endDate: data?.endDate,
      workingDays: Number(data?.workingDays),
      dailyWorkingHrs: Number(data?.dailyWorkingHrs),
      totalSprintHrs: Number(data?.workingDays) * Number(data?.dailyWorkingHrs),
      sprintType: data?.sprintType,
    };
    console.log('postData', postData);
    axiosInstance
      .post(sprintUrl, postData)
      .then((response) => {
        Toast({
          message: 'Sprint Create Successful!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchSprints());
        reset();
        closeModal();
      })
      .catch((error) => {
        handleApiError(error, 'Failed to create sprint!');
        console.error(error);
      });
  };

  const handleClear = () => reset();

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-4 rounded-bottom border"
    >
      <div className="row g-3">
        <Form
          schema={schema}
          register={register}
          control={control}
          errors={errors}
          resetField={resetField}
        />
      </div>

      <div className="d-flex justify-content-end gap-2 mt-3 py-2 border-top">
        <Button variant="danger" onClick={() => handleClear()}>
          <i className="bi bi-x" /> Cancel
        </Button>

        <PermissionGuard action="add">
          <Button variant="primary" type="submit">
            <i className="bi bi-floppy2-fill" /> Save
          </Button>
        </PermissionGuard>
      </div>
    </form>
  );
}
