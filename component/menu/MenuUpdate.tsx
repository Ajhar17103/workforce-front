'use client';

import Form from '@/common/form/Form';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch } from '@/redux/hooks';
import { fetchCountries } from '@/redux/slices/countrySlice';
import { fetchMissions } from '@/redux/slices/missionSlice';
import { FormField } from '@/types/common/FormField';
import { MenuParam, MenuUpdateProps } from '@/types/master-data/menu.type';
import { getUtilityApiUrl } from '@/utils/api';
import { getDefaultValues } from '@/utils/getDefaultValues';
import { setSchemaDefaultValue } from '@/utils/setSchemaDefaultValue';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { menuFormSchema as baseSchema } from './MenuFormSchema';

export default function MenuUpdate({
  itemUpdate,
  closeModal,
}: MenuUpdateProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<MenuParam>({
    defaultValues: getDefaultValues<MenuParam>(itemUpdate),
  });
  const menuUrl = getUtilityApiUrl('/menus');

  const dispatch = useAppDispatch();

  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    if (itemUpdate) {
      const enumMap = {
        missionCountryId: [],
      };
      const withEnums = setSchemaEnum(baseSchema, enumMap);

      const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);

      setSchema(finalSchema);
    }
  }, [itemUpdate]);

  const handleFormSubmit = (data: MenuParam) => {
    let menuPostData = {
      name: data.menuType === 'MAIN' ? data?.menuName : data?.subName,
      icon: data.menuType === 'MAIN' ? data?.icon : '',
      path: data?.path,
      menuType: data.menuType,
      parentId: data?.parentId ? data?.parentId : null,
    };

    if (itemUpdate?.id) {
      axiosInstance
        .put(`${menuUrl}/${itemUpdate?.id}`, menuPostData)
        .then((response) => {
          toast.success('Mission created successfully', { theme: 'dark' });
          dispatch(fetchMissions());
          closeModal();
          console.log(response);
        })
        .catch((error) => {
          toast.error('Something went wrong!', {
            theme: 'dark',
            closeOnClick: false,
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
