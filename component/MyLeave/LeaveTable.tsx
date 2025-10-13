'use client';

import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchLeaveRequestsByUserId } from '@/redux/slices/leaveRequestSlice';
import {
  LeaveRequestDto,
  LeaveRequestParam,
} from '@/types/my-leave/my-leave.type';
import { getSessionStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import Update from './LeaveUpdate';
import { formSchema as baseSchema, tableSchema } from './MyLeaveSchema';

export default function LeaveTable() {
  const user_id = getSessionStorage('user_id');
  const dispatch = useAppDispatch();
  const { userLeaveRequests } = useAppSelector((state) => state.leaveRequest);
  const [tableData, setTableData] = useState<LeaveRequestDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<LeaveRequestParam>({
    id: '',
    userId: '',
    userName: '',
    fiscalYear: '',
    leaveType: '',
    leaveFor: '',
    fromDate: '',
    toDate: '',
    totalDay: '',
    reason: '',
    attchmentPath: '',
    leaveStatus: null,
  });

  useEffect(() => {
    if (user_id) {
      dispatch(fetchLeaveRequestsByUserId(user_id));
    }
  }, [dispatch, user_id]);

  useEffect(() => {
    const transformed: LeaveRequestDto[] = (userLeaveRequests || []).map(
      (lr: any) => ({
        id: lr?.id,
        userId: lr?.userId,
        userName: lr?.userName,
        fiscalYear: lr?.fiscalYear,
        leaveType: lr?.leaveType,
        leaveFor: lr?.leaveFor,
        fromDate: lr?.fromDate,
        toDate: lr?.toDate,
        totalDay: lr?.totalDay,
        reason: lr?.reason,
        attchmentPath: lr?.attchmentPath,
        leaveStatus: lr?.leaveStatus,
      }),
    );
    setTableData(transformed);
  }, [userLeaveRequests]);

  const updateItem = async (item: LeaveRequestDto) => {
    const updateData: LeaveRequestParam = {
      id: item?.id,
      userId: item?.userId,
      userName: item?.userName,
      fiscalYear: item?.fiscalYear,
      leaveType: item?.leaveType,
      leaveFor: item?.leaveFor,
      fromDate: item?.fromDate,
      toDate: item?.toDate,
      totalDay: item?.totalDay,
      reason: item?.reason,
      attchmentPath: item?.attchmentPath,
    };
    setModalShow(true);
    setItemUpdate(updateData);
  };
  const cancelItem = async (item: LeaveRequestDto) => {
    const updateData: LeaveRequestParam = {
      id: item?.id,
      userId: item?.userId,
      userName: item?.userName,
      fiscalYear: item?.fiscalYear,
      leaveType: item?.leaveType,
      leaveFor: item?.leaveFor,
      fromDate: item?.fromDate,
      toDate: item?.toDate,
      totalDay: item?.totalDay,
      reason: item?.reason,
      attchmentPath: item?.attchmentPath,
    };
  };

  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={tableSchema}
        action={true}
        pagination={true}
        onEdit={updateItem}
        onRecject={cancelItem}
      />

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="Leave Update"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <Update
            schema={baseSchema}
            itemUpdate={itemUpdate}
            closeModal={() => setModalShow(false)}
          />
        </CommonModal>
      )}
    </div>
  );
}
