'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch } from '@/redux/hooks';
import { fetchMenus } from '@/redux/slices/menuSlice';
import { ProjectParam, ProjectUpdateProps } from '@/types/master-data/project.type';
import { getMasterApiUrl } from '@/utils/api';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';


export default function ProjectUpdate({
  schema,
  itemUpdate,
  closeModal,
}: ProjectUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<ProjectParam>({
    defaultValues: getDefaultValues<ProjectParam>(itemUpdate),
  });

  const projectUrl = getMasterApiUrl('/projects');
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: ProjectParam) => {
    const menuPostData = {
      name: '',
      description: '',
      startDate: '',
      endDate: null,
      assignToUser: [],
    };

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${projectUrl}/${itemUpdate.id}`, menuPostData)
        .then((response) => {
          Toast({
            message: 'Project Updated Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchMenus());
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
        <PermissionGuard action="update">
          <Button variant="primary" type="submit">
            <i className="bi bi-floppy2-fill" /> Update
          </Button>
        </PermissionGuard>
      </div>
    </form>
  );
}
