'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch } from '@/redux/hooks';
import { fetchMenus } from '@/redux/slices/menuSlice';
import { MenuParam, MenuUpdateProps } from '@/types/master-data/menu.type';
import { getMasterApiUrl } from '@/utils/api';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export default function MenuUpdate({
  schema,
  itemUpdate,
  closeModal,
}: MenuUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm<MenuParam>({
    defaultValues: getDefaultValues<MenuParam>(itemUpdate),
  });

  const menuUrl = getMasterApiUrl('/menus');
  const dispatch = useAppDispatch();

  const handleFormSubmit = (data: MenuParam) => {
    const isMainMenu = !data.parentId;

    const menuPostData = {
      name: data?.menuName,
      icon: isMainMenu ? data?.icon : '',
      path: data?.path || '',
      parentId: data?.parentId || null,
    };

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${menuUrl}/${itemUpdate.id}`, menuPostData)
        .then((response) => {
          Toast({
            message: 'Menu Updated Successful!',
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
