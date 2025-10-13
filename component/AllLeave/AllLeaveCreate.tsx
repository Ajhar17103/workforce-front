'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAllocatedLeaves } from '@/redux/slices/allocatedLeaveSlice';
import { fetchUsers } from '@/redux/slices/userSlice';
import { FormField } from '@/types/common/FormField';
import {
  AllocatedLeaveParam,
  AllocatedLeaveUpdateProps,
} from '@/types/my-leave/my-leave.type';
import { getLeaveApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { formSchema as baseSchema } from './AllLeaveSchema';

export default function AllLeaveCreate({
  closeModal,
}: AllocatedLeaveUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AllocatedLeaveParam>();
  const leaveUrl = getLeaveApiUrl('/allocated-leaves');
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const userId = users.map((user) => ({
        id: user.id,
        name: user.name,
      }));

      const enumMap = {
        userId: userId,
      };

      const finalSchema = setSchemaEnum(baseSchema, enumMap);
      setSchema(finalSchema);
    }
  }, [users]);

  const handleFormSubmit = (data: AllocatedLeaveParam) => {
    axiosInstance
      .post(leaveUrl, data)
      .then((response) => {
        Toast({
          message: 'Leave Create Successful!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchAllocatedLeaves());
        reset();
        closeModal();
      })
      .catch((error) => {
        handleApiError(error, 'Failed to leave task!');
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
