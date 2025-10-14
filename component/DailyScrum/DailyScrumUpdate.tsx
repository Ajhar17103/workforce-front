'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch } from '@/redux/hooks';
import { fetchDailyStandupsByUserId } from '@/redux/slices/dailyStandupSlice';
import {
  DailyScrumParam,
  DailyScrumUpdateProps,
} from '@/types/daily-scrum/daily-scrum.type';
import { getStandupiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { getSessionStorage } from '@/utils/storage';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function DailyScrumUpdate({
  schema,
  itemUpdate,
  closeModal,
}: DailyScrumUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<DailyScrumParam>({
    defaultValues: getDefaultValues<DailyScrumParam>(itemUpdate),
  });

  const user_id = getSessionStorage('user_id');
  const standUpUrl = getStandupiUrl('/daily-standups');
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: DailyScrumParam) => {
    const postData = {
      id: data?.id,
      userId: data?.userId,
      date: itemUpdate?.date,
      description: data?.description,
      challenge: data?.challenge,
    };

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${standUpUrl}/${itemUpdate.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Standup Updated Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          if (user_id) {
            dispatch(fetchDailyStandupsByUserId(user_id));
          }
          closeModal();
          console.log(response);
        })
        .catch((error) => {
          handleApiError(error, 'Failed to update standup!');
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
