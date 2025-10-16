'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserTaskReport } from '@/redux/slices/reportSlice';
import { TableHead } from '@/types/common/TableHead';
import { convertHoursToHrsMin } from '@/utils/convertHoursToHrsMin';
import { useEffect, useState } from 'react';
import Metric from './Component/Metric';

interface UserTaskSummary {
  id: string;
  userId: string;
  userName: string;
  designationId: string;
  designationName: string;
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  pendingTasks: number;
  allocatedTime: string;
  spentTime: string;
}

const tableColumns: TableHead<UserTaskSummary>[] = [
  {
    label: 'Name',
    accessor: 'userName',
    sortable: true,
    searchable: true,
    align: 'start',
  },
  {
    label: 'Designation',
    accessor: 'designationName',
    sortable: false,
    searchable: false,
    align: 'start',
  },
  {
    label: 'Total Tasks',
    accessor: 'totalTasks',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Completed',
    accessor: 'completedTasks',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'In Progress',
    accessor: 'inProgressTasks',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Pending',
    accessor: 'pendingTasks',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Allocated Time',
    accessor: 'allocatedTime',
    sortable: false,
    searchable: false,
    align: 'center',
  },
  {
    label: 'Spent Time',
    accessor: 'spentTime',
    sortable: false,
    searchable: false,
    align: 'center',
  },
];

export default function UserTaskReport() {
  const dispatch = useAppDispatch();
  const { userTaskReport, loading, error } = useAppSelector(
    (state) => state.reports,
  );
  const [userTaskSummary, setUserTaskSummary] = useState<UserTaskSummary[]>([]);
  const [activeTab, setActiveTab] = useState<'TO_DAY' | 'ALL'>('TO_DAY');
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<UserTaskSummary>();

  useEffect(() => {
    dispatch(fetchUserTaskReport());
  }, [dispatch]);

  useEffect(() => {
    if (userTaskReport?.length > 0) {
      const userTakData: any[] = userTaskReport.map((utr: any) => ({
        id: utr?.id,
        userId: utr?.userId,
        userName: utr?.userName,
        designationId: utr?.designationId,
        designationName: utr?.designationName,
        totalTasks: utr?.totalTasks,
        completedTasks: utr?.completedTasks,
        inProgressTasks: utr?.inProgressTasks,
        pendingTasks: utr?.pendingTasks,
        allocatedTime: convertHoursToHrsMin(utr?.allocatedTime),
        spentTime: convertHoursToHrsMin(utr?.spentTime),
      }));
      setUserTaskSummary(userTakData);
    }
  }, [userTaskReport]);

  const viewItem = (item: UserTaskSummary) => {
    setModalShow(true);
    setItemUpdate(item);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <Metric
      title="Users"
      value={userTaskSummary?.length}
      icon="bi bi-list-task"
      color="warning"
    >
      <div className="d-flex justify-content-between align-items-centermb-3">
        {(activeTab === 'TO_DAY' && <h6 className="mb-3">To Do</h6>) ||
          (activeTab === 'ALL' && <h6 className="mb-3">All</h6>)}
        <div className="d-flex justify-content-start align-items-center gap-2">
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-circle"
            variant={activeTab === 'TO_DAY' ? 'primary' : 'outline-primary'}
            tooltip="To Day"
            className={activeTab === 'TO_DAY' ? 'text-light' : 'text-primary'}
            onClick={() => setActiveTab('TO_DAY')}
          />

          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-grid"
            variant={activeTab === 'ALL' ? 'info' : 'outline-info'}
            tooltip="All"
            className={activeTab === 'ALL' ? 'text-light' : 'text-info'}
            onClick={() => setActiveTab('ALL')}
          />
        </div>
      </div>
      <DynamicTable
        data={userTaskSummary}
        columns={tableColumns}
        action={true}
        pagination={true}
        onView={viewItem}
      />
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="User Task Details"
          size="xl"
          footer={false}
          fullscreen="xl-down"
        >
          <h1>Hello</h1>
        </CommonModal>
      )}
    </Metric>
  );
}
