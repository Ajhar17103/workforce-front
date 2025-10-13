'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch } from '@/redux/hooks';
import { fetchLeaveRequests } from '@/redux/slices/leaveRequestSlice';
import {
  LeaveRequestParam,
  LeaveUpdateProps,
} from '@/types/my-leave/my-leave.type';
import { getLeaveApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { getSessionStorage } from '@/utils/storage';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function LeaveReject({
  schema,
  itemUpdate,
  closeModal,
  setActiveTab,
}: LeaveUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<LeaveRequestParam>({
    defaultValues: getDefaultValues<LeaveRequestParam>(itemUpdate),
  });
  const user_id = getSessionStorage('user_id');
  const leaveUrl = getLeaveApiUrl('/leave-requests');
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: LeaveRequestParam) => {
    const postData = {
      id: data?.id,
      userId: data?.userId,
      userName: data?.userName,
      fiscalYear: data?.fiscalYear,
      leaveType: data?.leaveType,
      leaveFor: data?.leaveFor,
      fromDate: data?.fromDate,
      toDate: data?.toDate,
      totalDay: data?.totalDay,
      reason: data?.reason,
      attchmentPath: data?.attchmentPath,
      leaveStatus: data?.leaveStatus,
      remarks: data?.remarks,
    };

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${leaveUrl}/${itemUpdate.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Leave Completed Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchLeaveRequests());
          setActiveTab('REJECTED');
          closeModal();
          console.log(response);
        })
        .catch((error) => {
          handleApiError(error, 'Failed to ceompleted leave!');
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
            <i className="bi bi-floppy2-fill" /> Reject
          </Button>
        </PermissionGuard>
      </div>
    </form>
  );
}
