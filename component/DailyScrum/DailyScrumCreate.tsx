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
import { getSessionStorage } from '@/utils/storage';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { formSchema as baseSchema } from './DailyScrumSchema';

export default function DailyScrumCreate({
  closeModal,
}: DailyScrumUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DailyScrumParam>();
  const user_id = getSessionStorage('user_id');
  const standUpUrl = getStandupiUrl('/daily-standups');
  const dispatch = useAppDispatch();
  const today = new Date();

  const handleFormSubmit = (data: DailyScrumParam) => {
    if (user_id) {
      const postData: DailyScrumParam = {
        id: data?.id,
        userId: user_id,
        date: today.toLocaleDateString('en-CA'),
        description: data?.description,
        challenge: data?.challenge,
      };
      axiosInstance
        .post(standUpUrl, postData)
        .then((response) => {
          Toast({
            message: 'Standup Create Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          if (user_id) {
            dispatch(fetchDailyStandupsByUserId(user_id));
          }
          reset();
          closeModal();
        })
        .catch((error) => {
          handleApiError(error, 'Failed to create standup!');
          console.error(error);
        });
    }
  };

  const handleClear = () => reset();

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-white p-4 rounded-bottom border"
    >
      <div className="row g-3">
        <Form
          schema={baseSchema}
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
