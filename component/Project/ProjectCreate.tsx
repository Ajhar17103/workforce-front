'use client';

import Form from '@/common/forms/Form';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjects } from '@/redux/slices/projectSlice';
import { fetchUsers } from '@/redux/slices/userSlice';
import { FormField } from '@/types/common/FormField';
import {
  ProjectParam,
  ProjectUpdateProps,
} from '@/types/master-data/project.type';
import { getMasterApiUrl } from '@/utils/api';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { projectFormSchema as baseSchema } from './ProjectFormSchema';

export default function ProjectCreate({ closeModal }: ProjectUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectParam>();

  const projectUrl = getMasterApiUrl('/projects');
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.user);
  const { projects } = useAppSelector((state) => state.project);
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProjects());
  }, [dispatch]);

  useEffect(() => {
    if (users) {
      const assignToUser = users.map((user) => ({
        id: user.id,
        name: `${user.name}, ${user.designationName}`,
      }));

      const enumMap = {
        assignToUser: assignToUser,
      };

      const finalSchema = setSchemaEnum(baseSchema, enumMap);
      setSchema(finalSchema);
    }
  }, [users]);

  const handleFormSubmit = (data: ProjectParam) => {
    // const isMainMenu = !data.parentId;
    // let parentMenu = data?.parentId
    //   ? menus?.find((menu) => menu.id === data.parentId)?.name || ''
    //   : '';
    // const menuPostData = {
    //   parentId: data.parentId || null,
    //   parentMenu: parentMenu,
    //   name: data.parentId ? data.subName : data.menuName,
    //   icon: isMainMenu ? data.icon : null,
    //   path: data.path || null,
    // };
    // axiosInstance
    //   .post(projectUrl, menuPostData)
    //   .then((response) => {
    //     Toast({
    //       message: 'Menu Create Successful!',
    //       type: 'success',
    //       autoClose: 1500,
    //       theme: 'colored',
    //     });
    //     dispatch(fetchProjects());
    //     reset();
    //     closeModal();
    //   })
    //   .catch((error) => {
    //     Toast({
    //       message: 'Something went worng!',
    //       type: 'warning',
    //       autoClose: 1500,
    //       theme: 'colored',
    //     });
    //     console.error(error);
    //   });
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
