'use client';

import CustomButton from '@/common/Buttons/Button';
import { Toast } from '@/common/messages/toast';
import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import axiosInstance from '@/lib/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchLeaveRequests } from '@/redux/slices/leaveRequestSlice';
import {
  LeaveRequestDto,
  LeaveRequestParam,
} from '@/types/my-leave/my-leave.type';
import { getLeaveApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getSessionStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Reject from './LeaveReject';
import {
  formCompleteSchema,
  formViewSchema,
  tableSchema,
} from './LeaveRequestSchema';
import View from './LeaveRequestView';

export default function LeaveRequestPage() {
  const leaveUrl = getLeaveApiUrl('/leave-requests');
  const user_id = getSessionStorage('user_id');
  const [activeTab, setActiveTab] = useState<
    'PENDING' | 'APPROVED' | 'REJECTED'
  >('PENDING');
  const dispatch = useAppDispatch();
  const { leaveRequests } = useAppSelector((state) => state.leaveRequest);
  const [tableData, setTableData] = useState<LeaveRequestDto[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalViewShow, setModalViewShow] = useState<boolean>(false);
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
      dispatch(fetchLeaveRequests());
    }
  }, [dispatch, user_id]);

  useEffect(() => {
    const transformed: LeaveRequestDto[] = (leaveRequests || []).map(
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
    const filtered = transformed.filter(
      (leave) => leave.leaveStatus == activeTab,
    );
    setTableData(filtered);
  }, [leaveRequests, activeTab]);

  const onApproved = async (item: LeaveRequestDto) => {
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
      leaveStatus: 'APPROVED',
    };

    const result = await Swal.fire({
      title: 'Are you sure to approve?',
      text: 'Leave will be approve',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    });

    if (!result.isConfirmed) return;

    try {
      await axiosInstance.put(`${leaveUrl}/${item.id}`, updateData);

      Toast({
        message: `Task  moved to In Progress!`,
        type: 'success',
        autoClose: 1500,
        theme: 'colored',
      });
      dispatch(fetchLeaveRequests());

      setActiveTab('APPROVED');
    } catch (error) {
      console.error('Failed to update task:', error);
      handleApiError(error, `Failed to approve!`);
    }
  };

  const onRjected = async (item: LeaveRequestDto) => {
    if (!item?.id) return;

    const updateData: LeaveRequestDto = {
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
      leaveStatus: 'REJECTED',
      remarks: item?.remarks,
    };

    setItemUpdate(updateData);
    setModalShow(true);
  };

  const closeCompleteModal = () => {
    setModalShow(false);
  };

  const onView = (item: LeaveRequestDto) => {
    const updateData: LeaveRequestDto = {
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

    setItemUpdate(updateData);
    setTimeout(() => {
      setModalViewShow(true);
    }, 200);
  };

  const closeViewModal = () => {
    setModalViewShow(false);
  };

  return (
    <div className="card shadow-sm p-3 dark">
      <div className="d-flex justify-content-between align-items-centermb-3">
        {(activeTab === 'PENDING' && (
          <h6 className="mb-3">Pending Leaves</h6>
        )) ||
          (activeTab === 'APPROVED' && (
            <h6 className="mb-3">Approved Leaves</h6>
          )) ||
          (activeTab === 'REJECTED' && (
            <h6 className="mb-3">Rejected Leaves</h6>
          ))}
        <div className="d-flex justify-content-start align-items-center gap-2">
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-circle"
            variant={
              activeTab === 'PENDING' ? 'secondary' : 'outline-secondary'
            }
            tooltip="Pending"
            className={
              activeTab === 'PENDING' ? 'text-light' : 'text-secondary'
            }
            onClick={() => setActiveTab('PENDING')}
          />

          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-check-circle"
            variant={activeTab === 'APPROVED' ? 'success' : 'outline-success'}
            tooltip="APPROVED"
            className={activeTab === 'APPROVED' ? 'text-light' : 'text-success'}
            onClick={() => setActiveTab('APPROVED')}
          />

          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-x"
            variant={activeTab === 'REJECTED' ? 'danger' : 'outline-danger'}
            tooltip="Rejected"
            className={activeTab === 'REJECTED' ? 'text-light' : 'text-danger'}
            onClick={() => setActiveTab('REJECTED')}
          />
        </div>
      </div>
      <div>
        <DynamicTable
          data={tableData}
          columns={tableSchema}
          action={true}
          pagination={true}
          onCompleted={activeTab === 'PENDING' ? onApproved : undefined}
          onRecject={activeTab === 'PENDING' ? onRjected : undefined}
          onView={onView}
        />
      </div>

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeCompleteModal}
          title="Leave Reject"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <Reject
            schema={formCompleteSchema}
            itemUpdate={itemUpdate}
            closeModal={closeCompleteModal}
            setActiveTab={setActiveTab}
          />
        </CommonModal>
      )}
      {modalViewShow && (
        <CommonModal
          show={modalViewShow}
          onHide={closeViewModal}
          title="Leave Details"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <View
            schema={formViewSchema}
            itemUpdate={itemUpdate}
            closeModal={closeViewModal}
          />
        </CommonModal>
      )}
    </div>
  );
}
