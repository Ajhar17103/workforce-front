'use client';

import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchDailyStandupsByUserId } from '@/redux/slices/dailyStandupSlice';
import { fetchSprints } from '@/redux/slices/sprintSlice';
import {
  DailyScrumDto,
  DailyScrumParam,
} from '@/types/daily-scrum/daily-scrum.type';
import { getStandupiUrl } from '@/utils/api';
import { deleteApi } from '@/utils/deleteApi';
import { handleApiError } from '@/utils/errorHandler';
import { getSessionStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { formSchema as baseSchema, tableSchema } from './DailyScrumSchema';
import Update from './DailyScrumUpdate';

export default function DailyScrumTable() {
  const standUpUrl = getStandupiUrl('/daily-standups');
  const user_id = getSessionStorage('user_id');
  const dispatch = useAppDispatch();
  const { userDailyStandups } = useAppSelector((state) => state.dailyStandup);
  const [tableData, setTableData] = useState<DailyScrumDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<DailyScrumParam>({
    id: '',
    userId: '',
    date: '',
    description: '',
  });

  useEffect(() => {
    if (user_id) {
      dispatch(fetchDailyStandupsByUserId(user_id));
    }
  }, [dispatch, user_id]);
  useEffect(() => {
    const transformed: DailyScrumDto[] = (userDailyStandups ?? []).map(
      (ds) => ({
        id: ds?.id,
        userId: ds?.userId,
        userName: ds?.userName,
        date: ds?.date,
        description: ds?.description,
        challenge: ds?.challenge,
      }),
    );
    setTableData(transformed);
  }, [userDailyStandups]);

  const deleteItem = async (item: DailyScrumDto) => {
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
        await deleteApi(standUpUrl, item.id);
        toast.success('sprint deleted successfully.');
        dispatch(fetchSprints());
      } catch (error) {
        console.error('Failed to delete:', error);
        handleApiError(error, 'Failed to delete sprint!');
      }
    }
  };

  const updateItem = (item: DailyScrumDto) => {
    setModalShow(true);
    const updateData: DailyScrumParam = {
      id: item?.id,
      userId: item?.userId,
      date: item?.date,
      description: item?.description,
      challenge: item?.challenge,
    };

    setItemUpdate(updateData);
  };

  const closeModal = () => {
    setModalShow(false);
  };
  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={tableSchema}
        action={true}
        pagination={true}
        onEdit={updateItem}
        onDelete={deleteItem}
      />

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Scrum Update"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <Update
            schema={baseSchema}
            itemUpdate={itemUpdate}
            closeModal={closeModal}
          />
        </CommonModal>
      )}
    </div>
  );
}
