'use client';

import CustomButton from '@/common/Buttons/Button';
import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjectOverviewReport } from '@/redux/slices/reportSlice';
import { useEffect, useState } from 'react';
import { tableOverviewSchema } from './ProjectOverviewSchema';
import { taskTrackerMap } from '@/enums/taskTracker';

export default function ProjectOverview({ closeModal, itemUpdate }: any) {
  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'ROADMAP' | 'ISSUE' | 'SPENT-TIME'
  >('OVERVIEW');
  const dispatch = useAppDispatch();
  const { projectOverviewReport } = useAppSelector((state) => state.reports);
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    if (itemUpdate?.id) {
      dispatch(fetchProjectOverviewReport(itemUpdate.id));
    }
  }, [dispatch, itemUpdate]);

  useEffect(() => {
    const transformed: any[] = projectOverviewReport?.map((por) => ({
      id: por?.id,
      name: taskTrackerMap[por?.name],
      total: por?.total,
      open: por?.open,
      closed: por?.closed,
      hold: por?.hold,
    }));
    setTableData(transformed);
  }, [projectOverviewReport]);

  return (
    <div>
      <div className="card shadow-sm p-1 dark mb-2">
        <div className="d-flex justify-content-center align-items-center gap-2">
          <CustomButton
            size="xs"
            loading={false}
            label="Overveiw"
            tooltip="OVERVIEW"
            onClick={() => setActiveTab('OVERVIEW')}
            className={
              activeTab === 'OVERVIEW' ? 'text-light' : 'text-secondary'
            }
            variant={
              activeTab === 'OVERVIEW' ? 'secondary' : 'outline-secondary'
            }
          />
          <CustomButton
            size="xs"
            loading={false}
            label="Roadmap"
            tooltip="Roadmap"
            onClick={() => setActiveTab('ROADMAP')}
            className={activeTab === 'ROADMAP' ? 'text-light' : 'text-warning'}
            variant={activeTab === 'ROADMAP' ? 'warning' : 'outline-warning'}
          />
          <CustomButton
            size="xs"
            loading={false}
            label="Issues"
            tooltip="Issues"
            onClick={() => setActiveTab('ISSUE')}
            variant={activeTab === 'ISSUE' ? 'info' : 'outline-info'}
            className={activeTab === 'ISSUE' ? 'text-light' : 'text-info'}
          />
          <CustomButton
            size="xs"
            loading={false}
            label="Spent Time"
            tooltip="SPENT-TIME"
            onClick={() => setActiveTab('SPENT-TIME')}
            variant={activeTab === 'SPENT-TIME' ? 'success' : 'outline-success'}
            className={
              activeTab === 'SPENT-TIME' ? 'text-light' : 'text-success'
            }
          />
        </div>
      </div>
      <div className="card shadow-sm p-1 dark">
        {activeTab === 'OVERVIEW' && (
          <DynamicTable
            columns={tableOverviewSchema}
            data={tableData}
            action={false}
            pagination={true}
          />
        )}
      </div>
    </div>
  );
}
