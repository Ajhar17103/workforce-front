'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch } from '@/redux/hooks';
import { fetchDepartments } from '@/redux/slices/departmentSlice';
import {
  DepartmentParam,
  DepartmentUpdateProps,
} from '@/types/master-data/department.type';
import { getMasterApiUrl } from '@/utils/api';
import { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { departmentFormSchema as schema } from './DepartmentFormSchema';
import PermissionGuard from '@/lib/PermissionGuard';

export default function DepartmentCreate({
  closeModal,
}: DepartmentUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DepartmentParam>();

  const departmentUrl = getMasterApiUrl('/departments');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleFormSubmit = (data: DepartmentParam) => {
    axiosInstance
      .post(departmentUrl, data)
      .then((response) => {
        Toast({
          message: 'Department Create Successful!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchDepartments());
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
