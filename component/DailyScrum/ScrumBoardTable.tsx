'use client';

import CustomButton from '@/common/Buttons/Button';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchDailyStandups,
  fetchDailyStandupsByDate,
} from '@/redux/slices/dailyStandupSlice';
import { DailyScrumDto } from '@/types/daily-scrum/daily-scrum.type';
import { useEffect, useState } from 'react';
import { tableSchema } from './DailyScrumSchema';

export default function ScrumBoardTable() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState<'TO_DAY' | 'ALL'>('TO_DAY');
  const { dailyStandups, dateWiseStandups } = useAppSelector(
    (state) => state.dailyStandup,
  );
  const [tableData, setTableData] = useState<DailyScrumDto[]>([]);
  const today = new Date();

  useEffect(() => {
    if (activeTab === 'TO_DAY') {
      dispatch(fetchDailyStandupsByDate(today.toLocaleDateString('en-CA')));
    } else {
      dispatch(fetchDailyStandups());
    }
  }, [dispatch, activeTab]);

  useEffect(() => {
    if (activeTab === 'TO_DAY') {
      const transformed: DailyScrumDto[] = (dateWiseStandups ?? []).map(
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
    } else {
      const transformed: DailyScrumDto[] = (dailyStandups ?? []).map((ds) => ({
        id: ds?.id,
        userId: ds?.userId,
        userName: ds?.userName,
        date: ds?.date,
        description: ds?.description,
        challenge: ds?.challenge,
      }));
      setTableData(transformed);
    }
  }, [dailyStandups, dateWiseStandups, activeTab]);

  return (
    <div className="card shadow-sm p-3 dark">
      <div className="d-flex justify-content-between align-items-centermb-3">
        {(activeTab === 'TO_DAY' && <h6 className="mb-3">To Day Standup</h6>) ||
          (activeTab === 'ALL' && <h6 className="mb-3">All Standup</h6>)}
        <div className="d-flex justify-content-start align-items-center gap-2">
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-circle"
            variant={activeTab === 'TO_DAY' ? 'secondary' : 'outline-secondary'}
            tooltip="To Day"
            className={activeTab === 'TO_DAY' ? 'text-light' : 'text-secondary'}
            onClick={() => setActiveTab('TO_DAY')}
          />

          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-check-circle"
            variant={activeTab === 'ALL' ? 'success' : 'outline-success'}
            tooltip="All"
            className={activeTab === 'ALL' ? 'text-light' : 'text-success'}
            onClick={() => setActiveTab('ALL')}
          />
        </div>
      </div>
      <DynamicTable
        data={tableData}
        columns={tableSchema}
        action={false}
        pagination={true}
      />
    </div>
  );
}
