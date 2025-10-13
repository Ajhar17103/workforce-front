'use client';

import { Toast } from '@/common/messages/toast';
import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchLeaveRequestsByUserId } from '@/redux/slices/leaveRequestSlice';
import {
  LeaveRequestDto,
  LeaveRequestParam,
} from '@/types/my-leave/my-leave.type';
import { getLeaveApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getSessionStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Update from './LeaveUpdate';
import { formSchema as baseSchema, tableSchema } from './MyLeaveSchema';
import { fetchAllocatedLeavesByUserId } from '@/redux/slices/allocatedLeaveSlice';

export default function LeaveTable() {
  const user_id = getSessionStorage('user_id');
  const leaveUrl = getLeaveApiUrl('/leave-requests');
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
    if (item?.leaveStatus === 'PENDING') {
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
        leaveStatus: item?.leaveStatus,
      };
      setModalShow(true);
      setItemUpdate(updateData);
    } else {
      Toast({
        message: 'You can not change it',
        type: 'warning',
        autoClose: 1500,
        theme: 'colored',
      });
    }
  };

  const cancelItem = async (item: LeaveRequestDto) => {
    if (user_id && item?.leaveStatus === 'PENDING') {
      if (!item?.id) return;

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
        leaveStatus: 'CANCELLED',
      };

      const result = await Swal.fire({
        title: 'Are you sure to cancel?',
        text: 'Leave will be cancel',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, cancel it!',
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
      });

      if (!result.isConfirmed) return;

      try {
        await axiosInstance.put(`${leaveUrl}/${item.id}`, updateData);
        Toast({
          message: 'Task  moved to In Progress!',
          type: 'success',
          autoClose: 1500,
          theme: 'colored',
        });
        dispatch(fetchLeaveRequestsByUserId(user_id));
        dispatch(fetchAllocatedLeavesByUserId(user_id));
      } catch (error) {
        console.error('Failed to update task:', error);
        handleApiError(error, `Failed to approve!`);
      }
    } else {
      Toast({
        message: 'You can not cancel it',
        type: 'warning',
        autoClose: 1500,
        theme: 'colored',
      });
    }
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
