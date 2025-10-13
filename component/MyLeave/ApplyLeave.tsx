'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch } from '@/redux/hooks';
import { fetchAllocatedLeavesByUserId } from '@/redux/slices/allocatedLeaveSlice';
import { fetchLeaveRequestsByUserId } from '@/redux/slices/leaveRequestSlice';
import {
  LeaveRequestParam,
  LeaveUpdateProps,
} from '@/types/my-leave/my-leave.type';
import { getLeaveApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getSessionStorage } from '@/utils/storage';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { formSchema as baseSchema } from './MyLeaveSchema';

export default function ApplyLeave({ closeModal }: LeaveUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LeaveRequestParam>();
  const user_id = getSessionStorage('user_id');
  const leaveUrl = getLeaveApiUrl('/leave-requests');
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: LeaveRequestParam) => {
    if (user_id) {
      const postData = {
        userId: user_id,
        userName: data?.userName,
        fiscalYear: '2025',
        leaveType: data?.leaveType,
        leaveFor: data?.leaveFor,
        fromDate: data?.fromDate,
        toDate: data?.toDate,
        totalDay: data?.totalDay,
        reason: data?.reason,
        attchmentPath:
          'b2fc8ac9480164fef9b2818b7c686c1726966ee2ae1e5584286fbb498f59cad.png',
      };
      axiosInstance
        .post(leaveUrl, postData)
        .then((response) => {
          Toast({
            message: 'Leave Applied Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchLeaveRequestsByUserId(user_id));
          dispatch(fetchAllocatedLeavesByUserId(user_id));
          reset();
          closeModal();
        })
        .catch((error) => {
          handleApiError(error, 'Failed to create leave!');
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
