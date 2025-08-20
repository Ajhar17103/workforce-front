'use client';

import Form from '@/common/forms/Form';
import { Toast } from '@/common/messages/toast';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMenus } from '@/redux/slices/menuSlice';
import { FormField, onChangeField } from '@/types/common/FormField';
import { MenuParam, MenuUpdateProps } from '@/types/master-data/menu.type';
import { getMasterApiUrl } from '@/utils/api';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { menuFormSchema as baseSchema } from './MenuFormSchema';
import PermissionGuard from '@/lib/PermissionGuard';

export default function MenuCreate({ closeModal }: MenuUpdateProps) {
  const {
    register,
    control,
    resetField,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<MenuParam>();

  const menuUrl = getMasterApiUrl('/menus');
  const dispatch = useAppDispatch();
  const { menus } = useAppSelector((state) => state.menu);
  const [schema, setSchema] = useState<FormField[]>(baseSchema);
  const [onChangeType, setOnchangeType] = useState<onChangeField>({});

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    if (menus) {
      const parentItem = menus
        .filter((menu) => menu.parentId === null)
        .map((menu) => ({ id: menu.id, name: menu.name }));

      const enumMap = {
        parentId: parentItem,
      };

      const finalSchema = setSchemaEnum(baseSchema, enumMap);
      setSchema(finalSchema);
    }
  }, [menus]);

  const handleFormSubmit = (data: MenuParam) => {
    const isMainMenu = !data.parentId;
    let parentMenu = data?.parentId
      ? menus?.find((menu) => menu.id === data.parentId)?.name || ''
      : '';

    const menuPostData = {
      parentId: data.parentId || null,
      parentMenu: parentMenu,
      name: data.parentId ? data.subName : data.menuName,
      icon: isMainMenu ? data.icon : null,
      path: data.path || null,
    };
    axiosInstance
      .post(menuUrl, menuPostData)
      .then((response) => {
        Toast({
          message: 'Menu Create Successful!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchMenus());
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
