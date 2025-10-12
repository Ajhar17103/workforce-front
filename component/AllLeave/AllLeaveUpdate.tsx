'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch } from '@/redux/hooks';
import { fetchTasks } from '@/redux/slices/taskSlice';
import { LeaveParam, LeaveUpdateProps } from '@/types/my-leave/my-leave.type';
import { getTaskApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function AllLeaveUpdate({
  schema,
  itemUpdate,
  closeModal,
}: LeaveUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<LeaveParam>({
    defaultValues: getDefaultValues<LeaveParam>(itemUpdate),
  });

  const taskUrl = getTaskApiUrl('/tasks');
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: LeaveParam) => {
    const postData = {};

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${taskUrl}/${itemUpdate.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Task Updated Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchTasks());
          closeModal();
          console.log(response);
        })
        .catch((error) => {
          handleApiError(error, 'Failed to update task!');
          console.error(error);
        });
    }
  };
  console.log('schema', schema);
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
