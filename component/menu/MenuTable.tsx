import CommonModal from '@/common/modal/CommonModal';
import DynamicTable from '@/common/table/DataTable';
import { useAppDispatch } from '@/redux/hooks';
import { fetchMissions } from '@/redux/slices/missionSlice';
import { MenuDto, MenuParam } from '@/types/master-data/menu.type';
import { getUtilityApiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import MenuUpdate from './MenuUpdate';
import { menus } from './dummyData';

export default function MenuTable() {
  const missionUrl = getUtilityApiUrl('/missions');

  const dispatch = useAppDispatch();

  const [tableData, setTableData] = useState<MenuDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<MenuParam>({
    id: 1,
    menuName: '',
    subName: '',
    menuType: 'MAIN',
    icon: '',
    path: null,
    parentId: null,
  });

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);
  useEffect(() => {
    const transformed: MenuDto[] = menus?.map((m) => ({
      id: m.id,
      name: m.name,
      menuType: m.menuType,
      parentId: m.parentId,
      parentMenu: m.parentMenu,
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
        const res = await deleteApi(missionUrl, item.id);
        console.log('Deleted successfully:', res);
        toast.success('Mission deleted successfully.');
        dispatch(fetchMissions());
      } catch (error) {
        console.error('Failed to delete:', error);
        toast.error('Failed to delete mission.');
      }
    }
  };

  const updateItem = (item: MenuDto) => {
    setModalShow(true);
    let menuUpdateData = {
      id: item.id,
      menuName: item.menuType === 'MAIN' ? item?.name : '',
      subName: item.menuType === 'SUB' ? '' : item?.name,
      menuType: item.menuType,
      icon: item.menuType === 'MAIN' ? item?.icon : '',
      path: item?.path,
      parentId: item?.parentId ? item?.parentId : null,
    };
    setItemUpdate(menuUpdateData);
  };
  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="">
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
            label: 'Menu Type',
            accessor: 'menuType',
            sortable: true,
            searchable: true,
            align: 'center',
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
        onEdit={(row) => updateItem(row)}
        onDelete={(row) => deleteItem(row)}
      />
      <CommonModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Menu Update"
        size="xl"
        footer={false}
        fullscreen={'xl-down'}
      >
        <MenuUpdate itemUpdate={itemUpdate} closeModal={() => closeModal()} />
      </CommonModal>
    </div>
  );
}
