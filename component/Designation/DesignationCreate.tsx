'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDepartments } from '@/redux/slices/departmentSlice';
import { fetchDesignations } from '@/redux/slices/designationSlice';
import { FormField } from '@/types/common/FormField';
import {
  DesignationParam,
  DesignationUpdateProps,
} from '@/types/master-data/designationt.type';
import { getMasterApiUrl } from '@/utils/api';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { designationFormSchema as baseSchema } from './DesignationFormSchema';

export default function DesignationCreate({
  closeModal,
}: DesignationUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DesignationParam>();

  const designationUrl = getMasterApiUrl('/designations');
  const dispatch = useAppDispatch();
  const [schema, setSchema] = useState<FormField[]>(baseSchema);
  const { departments } = useAppSelector((state) => state.department);

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (departments) {
      const departmentId = departments.map((deparment) => ({
        id: deparment.id,
        name: deparment.name,
      }));

      const enumMap = {
        departmentId: departmentId,
      };
      const finalSchema = setSchemaEnum(baseSchema, enumMap);
      setSchema(finalSchema);
    }
  }, [departments]);

  const handleFormSubmit = (data: DesignationParam) => {
    axiosInstance
      .post(designationUrl, data)
      .then((response) => {
        Toast({
          message: 'Designation Create Successful!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchDesignations());
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

        <Button variant="primary" type="submit">
          <i className="bi bi-floppy2-fill" /> Save
        </Button>
      </div>
    </form>
  );
}
