'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch } from '@/redux/hooks';
import { fetchSprints } from '@/redux/slices/sprintSlice';
import {
  SprintParam,
  SprintUpdateProps,
} from '@/types/master-data/sprint.type';
import { getMasterApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function SprintUpdate({
  schema,
  itemUpdate,
  closeModal,
}: SprintUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<SprintParam>({
    defaultValues: getDefaultValues<SprintParam>(itemUpdate),
  });

  const sprintUrl = getMasterApiUrl('/sprints');
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: SprintParam) => {
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

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${sprintUrl}/${itemUpdate.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Sprint Updated Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchSprints());
          closeModal();
          console.log(response);
        })
        .catch((error) => {
          handleApiError(error, 'Failed to update sprint!');
          console.error(error);
        });
    }
  };
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white rounded-bottom"
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
        <Button variant="danger" onClick={() => closeModal()}>
          <i className="bi bi-x" /> Cancel
        </Button>
        <PermissionGuard action="update">
          <Button variant="primary" type="submit">
            <i className="bi bi-floppy2-fill" /> Update
          </Button>
        </PermissionGuard>
      </div>
    </form>
  );
}
