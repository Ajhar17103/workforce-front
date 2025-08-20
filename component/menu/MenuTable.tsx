'use client';

import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchMenus } from '@/redux/slices/menuSlice';
import { FormField } from '@/types/common/FormField';
import { MenuDto, MenuParam } from '@/types/master-data/menu.type';
import { getMasterApiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { setSchemaDefaultValue } from '@/utils/setSchemaDefaultValue';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { menuFormSchema as baseSchema } from './MenuFormSchema';
import MenuUpdate from './MenuUpdate';

export default function MenuTable() {
  const menuUrl = getMasterApiUrl('/menus');
  const dispatch = useAppDispatch();
  const { menus } = useAppSelector((state) => state.menu);

  const [tableData, setTableData] = useState<MenuDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<MenuParam>({
    id: '0',
    menuName: '',
    subName: '',
    icon: '',
    path: null,
    parentId: null,
  });
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

  useEffect(() => {
    dispatch(fetchMenus());
  }, [dispatch]);

  useEffect(() => {
    const transformed: MenuDto[] = menus?.map((m) => ({
      id: m.id,
      parentId: m.parentId,
      parentMenu: m.parentMenu,
      name: m.name,
      icon: m.icon,
      path: m.path,
    }));
    setTableData(transformed);
  }, [menus]);

  const deleteItem = async (item: MenuDto) => {
    if (!item?.id) return;

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      try {
        await deleteApi(menuUrl, item.id);
        toast.success('Menu deleted successfully.');
        dispatch(fetchMenus());
      } catch (error) {
        console.error('Failed to delete:', error);
        toast.error('Failed to delete menu.');
      }
    }
  };

  const updateItem = (item: MenuDto) => {
    setModalShow(true);

    const parentItem = menus
      .filter((menu) => menu.parentId === null)
      .map((menu) => ({ id: menu.id, name: menu.name }));

    const enumMap = {
      parentId: parentItem,
    };

    const withEnums = setSchemaEnum(baseSchema, enumMap);
    const finalSchema = setSchemaDefaultValue(withEnums, itemUpdate);
    console.log(baseSchema);
    setSchema(finalSchema);

    const isMainMenu = !item.parentId;
    console.log(isMainMenu);

    const menuUpdateData: MenuParam = {
      id: item.id,
      menuName: isMainMenu ? item?.name : item?.parentMenu,
      subName: !isMainMenu ? item?.name : '',
      icon: isMainMenu ? item?.icon : '',
      path: item?.path,
      parentId: item?.parentId,
      menuType: item.parentId ? 'SUB' : 'MAIN',
    };

    setItemUpdate(menuUpdateData);
  };

  const closeModal = () => {
    setModalShow(false);
  };
  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={[
          {
            label: 'Name',
            accessor: 'name',
            sortable: true,
            searchable: true,
            align: 'start',
          },
          {
            label: 'Parent Menu',
            accessor: 'parentMenu',
            sortable: true,
            searchable: true,
            align: 'start',
          },
          {
            label: 'Icon',
            accessor: 'icon',
            sortable: true,
            searchable: true,
            align: 'start',
          },
          {
            label: 'Path',
            accessor: 'path',
            sortable: true,
            searchable: true,
            align: 'start',
          },
        ]}
        onEdit={updateItem}
        onDelete={deleteItem}
      />
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Menu Update"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <MenuUpdate
            schema={schema}
            itemUpdate={itemUpdate}
            closeModal={closeModal}
          />
        </CommonModal>
      )}
    </div>
  );
}
