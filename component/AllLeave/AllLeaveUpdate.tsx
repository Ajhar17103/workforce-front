'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch } from '@/redux/hooks';
import { fetchAllocatedLeaves } from '@/redux/slices/allocatedLeaveSlice';
import {
  AllocatedLeaveParam,
  AllocatedLeaveUpdateProps,
} from '@/types/my-leave/my-leave.type';
import { getLeaveApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function AllLeaveUpdate({
  schema,
  itemUpdate,
  closeModal,
}: AllocatedLeaveUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<AllocatedLeaveParam>({
    defaultValues: getDefaultValues<AllocatedLeaveParam>(itemUpdate),
  });
  const leaveUrl = getLeaveApiUrl('/allocated-leaves');
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: AllocatedLeaveParam) => {
    if (itemUpdate?.id) {
      axiosInstance
        .put(`${leaveUrl}/${itemUpdate.id}`, data)
        .then((response) => {
          Toast({
            message: 'Leave Updated Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchAllocatedLeaves());
          closeModal();
          console.log(response);
        })
        .catch((error) => {
          handleApiError(error, 'Failed to update leave!');
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
