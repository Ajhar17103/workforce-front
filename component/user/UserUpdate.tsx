'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch } from '@/redux/hooks';
import { fetchUsers } from '@/redux/slices/userSlice';
import { UserParam, UserUpdateProps } from '@/types/master-data/user.type';
import { getMasterApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function UserUpdate({
  schema,
  itemUpdate,
  closeModal,
  onChangeType,
  setOnchangeType,
  handleDepartmentChange,
}: UserUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<UserParam>({
    defaultValues: getDefaultValues<UserParam>(itemUpdate),
  });

  const userUrl = getMasterApiUrl('/users');
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (onChangeType?.type === 'handleDepartmentChange' && onChangeType?.id) {
      handleDepartmentChange?.(onChangeType?.id);
    }
  }, [onChangeType]);

  const handleFormSubmit = (data: UserParam) => {
    const postData = {
      name: data?.name,
      designationId: data?.designationId,
      roleId: data?.roleId,
      dob: data?.dob,
      phone: data?.phone,
      email: data?.email,
      currentAddress: data?.currentAddress,
      presentAddress: data?.presentAddress,
      bloodGroup: data?.bloodGroup,
      password: data?.password,
    };

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${userUrl}/${itemUpdate.id}`, postData)
        .then((response) => {
          Toast({
            message: 'User Updated Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchUsers());
          closeModal();
          console.log(response);
        })
        .catch((error) => {
          handleApiError(error, 'Failed to create user!');
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
          setOnchangeType={setOnchangeType}
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
