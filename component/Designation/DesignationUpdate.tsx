'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch } from '@/redux/hooks';
import { fetchDesignations } from '@/redux/slices/designationSlice';
import {
  DesignationParam,
  DesignationUpdateProps,
} from '@/types/master-data/designationt.type';
import { getMasterApiUrl } from '@/utils/api';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function DesignationUpdate({
  schema,
  itemUpdate,
  closeModal,
}: DesignationUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<DesignationParam>({
    defaultValues: getDefaultValues<DesignationParam>(itemUpdate),
  });

  const designationUrl = getMasterApiUrl('/designations');
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: DesignationParam) => {
    const postData = {
      name: data?.name,
      departmentId: data?.departmentId,
    };

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${designationUrl}/${itemUpdate.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Designation Updated Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchDesignations());
          closeModal();
          console.log(response);
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

        <Button variant="primary" type="submit">
          <i className="bi bi-floppy2-fill" /> Save
        </Button>
      </div>
    </form>
  );
}
