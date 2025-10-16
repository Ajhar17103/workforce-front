'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchDailyStandupReport,
  fetchDailyStandupsByDateReport,
} from '@/redux/slices/reportSlice';
import { TableHead } from '@/types/common/TableHead';
import { truncateWords } from '@/utils/truncateWords';
import { useEffect, useState } from 'react';
import Metric from './Component/Metric';

interface UserScrumSummary {
  id: string;
  userId?: string;
  userName: string;
  date: string;
  description: string;
  challenge: string;
}

const tableColumns: TableHead<UserScrumSummary>[] = [
  {
    label: 'Name',
    accessor: 'userName',
    sortable: true,
    searchable: true,
    align: 'start',
  },
  {
    label: 'Date',
    accessor: 'date',
    sortable: false,
    searchable: false,
    align: 'start',
  },
  {
    label: 'Description',
    accessor: 'description',
    sortable: false,
    searchable: false,
    align: 'start',
  },
  {
    label: 'Challenge',
    accessor: 'challenge',
    sortable: false,
    searchable: false,
    align: 'start',
  },
];

export default function ScrumReport() {
  const dispatch = useAppDispatch();
  const { dailyStandupReport, dateWiseStandupReport, loading, error } =
    useAppSelector((state) => state.reports);
  const [userScrumSummary, setUserScrumSummary] = useState<UserScrumSummary[]>(
    [],
  );
  const [activeTab, setActiveTab] = useState<'TO_DAY' | 'ALL'>('TO_DAY');
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState<UserScrumSummary>();

  const today = new Date();

  useEffect(() => {
    if (activeTab === 'TO_DAY') {
      dispatch(
        fetchDailyStandupsByDateReport(today.toLocaleDateString('en-CA')),
      );
    } else {
      dispatch(fetchDailyStandupReport());
    }
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (activeTab === 'TO_DAY') {
      const transformed: UserScrumSummary[] = (dateWiseStandupReport ?? []).map(
        (ds) => ({
          id: ds?.id,
          userId: ds?.userId,
          userName: ds?.userName,
          date: ds?.date,
          description: truncateWords(ds?.description, 1),
          challenge: truncateWords(ds?.challenge, 1),
        }),
      );
      setUserScrumSummary(transformed);
    } else {
      const transformed: UserScrumSummary[] = (dailyStandupReport ?? []).map(
        (ds) => ({
          id: ds?.id,
          userId: ds?.userId,
          userName: ds?.userName,
          date: ds?.date,
          description: truncateWords(ds?.description, 1),
          challenge: truncateWords(ds?.challenge, 1),
        }),
      );
      setUserScrumSummary(transformed);
    }
  }, [dailyStandupReport, dateWiseStandupReport, activeTab]);

  const viewItem = (item: UserScrumSummary) => {
    setModalShow(true);
    setItemUpdate(item);
  };

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <Metric
      title="Daily Scrum"
      value={userScrumSummary?.length}
      icon="bi-people-fill"
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
        data={userScrumSummary}
        columns={tableColumns}
        action={true}
        pagination={true}
        rowsPerPage={5}
        onView={viewItem}
      />
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="User Scrum Details"
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
