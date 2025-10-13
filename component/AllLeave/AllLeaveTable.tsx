'use client';

import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAllocatedLeaves } from '@/redux/slices/allocatedLeaveSlice';
import { FormField } from '@/types/common/FormField';
import { AllocatedLeaveDto } from '@/types/my-leave/my-leave.type';
import { getMasterApiUrl } from '@/utils/api';
import { getByEntityApi } from '@/utils/getByEntityApi';
import { setSchemaEnum } from '@/utils/setSchemaEnum';
import { useEffect, useState } from 'react';
import { TableSchema, formSchema as baseSchema } from './AllLeaveSchema';
import Update from './AllLeaveUpdate';

export default function AllLeaveTable() {
  const dispatch = useAppDispatch();
  const userUrl = getMasterApiUrl('/users');
  const { allocatedLeaves } = useAppSelector((state) => state.leave);
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
  const [schema, setSchema] = useState<FormField[]>(baseSchema);

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
    if (item?.userId) {
      let user = await getByEntityApi(`${userUrl}`, item?.userId);

      const userId = [
        {
          id: user.id,
          name: user.name,
        },
      ];

      const enumMap = {
        userId: userId,
      };

      const finalSchema = setSchemaEnum(baseSchema, enumMap);
      setSchema(finalSchema);
    }

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
          title="Leave Update"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <Update
            schema={schema}
            itemUpdate={itemUpdate}
            closeModal={closeModal}
          />
        </CommonModal>
      )}
    </div>
  );
}
