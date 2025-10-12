'use client';

import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAllocatedLeaves } from '@/redux/slices/allocatedLeaveSlice';
import { AllocatedLeaveDto } from '@/types/my-leave/my-leave.type';
import { getLeaveApiUrl } from '@/utils/api';
import { useEffect, useState } from 'react';
import { TableSchema, formSchema } from './AllLeaveSchema';
import Update from './AllLeaveUpdate';

export default function AllLeaveTable() {
  const projectUrl = getLeaveApiUrl('/allocated-leaves');
  const dispatch = useAppDispatch();
  const { allocatedLeaves, userAllocatedLeaves } = useAppSelector(
    (state) => state.leave,
  );
  const [tableData, setTableData] = useState<AllocatedLeaveDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<AllocatedLeaveDto>({
    id: '',
    userId: '',
    userName: '',
    fiscalYear: '',
    totalSickLeave: '',
    takenSickLeave: '',
    totalCasualLeave: '',
    takenCasualLeave: '',
    totalAnnualLeave: '',
    takenAnnualLeave: '',
    paidLeave: '',
  });

  useEffect(() => {
    dispatch(fetchAllocatedLeaves());
  }, [dispatch]);

  useEffect(() => {
    const transformed: AllocatedLeaveDto[] = allocatedLeaves?.map((al) => ({
      id: al?.id,
      userId: al?.userId,
      userName: al?.userName,
      fiscalYear: al?.fiscalYear,
      totalSickLeave: al?.totalSickLeave,
      takenSickLeave: al?.takenSickLeave,
      totalCasualLeave: al?.totalCasualLeave,
      takenCasualLeave: al?.takenCasualLeave,
      totalAnnualLeave: al?.totalAnnualLeave,
      takenAnnualLeave: al?.takenAnnualLeave,
      paidLeave: al?.paidLeave,

      sickLeave: `${al?.takenSickLeave} / ${al?.totalSickLeave}`,
      casualLeave: `${al?.takenCasualLeave} / ${al?.totalCasualLeave}`,
      annualLeave: `${al?.takenAnnualLeave} / ${al?.totalAnnualLeave}`,
    }));
    setTableData(transformed);
  }, [allocatedLeaves]);

  const updateItem = async (item: AllocatedLeaveDto) => {
    const updateData: AllocatedLeaveDto = {
      id: item?.id,
      userId: item?.userId,
      userName: item?.userName,
      fiscalYear: item?.fiscalYear,
      totalSickLeave: item?.totalSickLeave,
      takenSickLeave: item?.takenSickLeave,
      totalCasualLeave: item?.totalCasualLeave,
      takenCasualLeave: item?.takenCasualLeave,
      totalAnnualLeave: item?.totalAnnualLeave,
      takenAnnualLeave: item?.takenAnnualLeave,
      paidLeave: item?.paidLeave,
    };

    setItemUpdate(updateData);
    setModalShow(true);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={TableSchema}
        action={true}
        pagination={true}
        onEdit={updateItem}
      />
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Project Update"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <Update
            schema={formSchema}
            itemUpdate={itemUpdate}
            closeModal={closeModal}
          />
        </CommonModal>
      )}
    </div>
  );
}
