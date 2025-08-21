'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDepartments } from '@/redux/slices/departmentSlice';
import { fetchRoles } from '@/redux/slices/roleSlice';
import { FormField, onChangeField } from '@/types/common/FormField';
import { UserParam, UserUpdateProps } from '@/types/master-data/user.type';
import { getMasterApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getByEntityApi } from '@/utils/getByEntityApi';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { userFormSchema as baseSchema } from './UserFormSchema';

export default function UserCreate({ closeModal }: UserUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<UserParam>();

  const designationUrl = getMasterApiUrl('/designations');
  const usersUrl = getMasterApiUrl('/users');
  const dispatch = useAppDispatch();
  const [schema, setSchema] = useState<FormField[]>(baseSchema);
  const { departments } = useAppSelector((state) => state.department);
  const { roles } = useAppSelector((state) => state.role);
  const [onChangeType, setOnchangeType] = useState<onChangeField>({});

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    if (departments && roles) {
      const departmentId = departments.map((department) => ({
        id: department.id,
        name: department.name,
      }));

      const roleId = roles.map((role) => ({
        id: role.id,
        name: role.name,
      }));

      const enumMap = {
        departmentId: departmentId,
        roleId: roleId,
      };
      setSchema((prevSchema) => setSchemaEnum(prevSchema, enumMap));
    }
  }, [departments, roles, baseSchema]);

  useEffect(() => {
    if (onChangeType?.type === 'handleDepartmentChange' && onChangeType?.id) {
      handleDepartmentChange(onChangeType?.id);
    }
  }, [onChangeType]);

  const handleDepartmentChange = async (id: any) => {
    let designation = await getByEntityApi(
      `${designationUrl}/by-department`,
      id,
    );
    console.log('designation', designation);
    const designationId = designation?.map((designation: any) => ({
      id: designation.id,
      name: designation.name,
    }));
    const enumMap = {
      designationId: designationId,
    };
    setSchema((prevSchema) => setSchemaEnum(prevSchema, enumMap));
  };

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
    console.log(postData);
    axiosInstance
      .post(usersUrl, postData)
      .then((response) => {
        Toast({
          message: 'User Create Successful!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        reset();
        closeModal();
      })
      .catch((error) => {
        handleApiError(error, 'Failed to create user!');
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
          setOnchangeType={setOnchangeType}
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
