'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch } from '@/redux/hooks';
import { fetchRoles } from '@/redux/slices/roleSlice';
import { RoleParam, RoleUpdateProps } from '@/types/master-data/role.type';
import { getMasterApiUrl } from '@/utils/api';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { roleFormSchema as schema } from './RoleFormSchema';
import PermissionGuard from '@/lib/PermissionGuard';

export default function RoleCreate({ closeModal }: RoleUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<RoleParam>();

  const roleUrl = getMasterApiUrl('/roles');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleFormSubmit = (data: RoleParam) => {
    axiosInstance
      .post(roleUrl, data)
      .then((response) => {
        Toast({
          message: 'Role Create Successful!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchRoles());
        reset();
        closeModal();
      })
      .catch((error) => {
        Toast({
          message: 'Something went worng!',
          type: 'warning',
          autoClose: 1500,
          theme: 'colored',
        });
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
