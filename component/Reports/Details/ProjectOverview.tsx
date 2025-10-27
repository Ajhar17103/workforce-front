'use client';

import CustomButton from '@/common/Buttons/Button';
import DynamicTable from '@/common/tables/DataTable';
import { taskTrackerMap } from '@/enums/taskTracker';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjectOverviewReport } from '@/redux/slices/reportSlice';
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { tableOverviewSchema } from './ProjectOverviewSchema';
import ProjectRoadmap from './ProjectRoadmap';

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

  const tabConfig = [
    {
      key: 'OVERVIEW',
      label: 'Overview',
      icon: 'bi-grid-fill',
      color: 'secondary',
    },
    { key: 'ROADMAP', label: 'Roadmap', icon: 'bi-map-fill', color: 'warning' },
    { key: 'ISSUE', label: 'Issues', icon: 'bi-bug-fill', color: 'info' },
    {
      key: 'SPENT-TIME',
      label: 'Spent Time',
      icon: 'bi-hourglass-split',
      color: 'success',
    },
  ];

  return (
    <div className="p-2">
      {/* Header */}
      <Card className="shadow-sm border-0 rounded-4 mb-3">
        <Card.Body className="p-2">
          <Row className="justify-content-center g-2">
            {tabConfig.map((tab) => (
              <Col xs="auto" key={tab.key}>
                <CustomButton
                  size="xs"
                  label={tab.label}
                  icon={tab.icon}
                  onClick={() => setActiveTab(tab.key as any)}
                  variant={
                    activeTab === tab.key ? tab.color : `outline-${tab.color}`
                  }
                  className={`fw-semibold ${
                    activeTab === tab.key ? 'text-light' : `text-${tab.color}`
                  }`}
                />
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Content */}
      <Card className="shadow-sm border-0 rounded-4 p-2 bg-body-tertiary">
        {activeTab === 'OVERVIEW' && (
            <DynamicTable
              columns={tableOverviewSchema}
              data={tableData}
              action={false}
              pagination={true}
            />
        )}
        {activeTab === 'ROADMAP' && <ProjectRoadmap itemUpdate={itemUpdate} />}
        {activeTab === 'ISSUE' && (
          <div className="text-center py-4 text-muted">
            <i className="bi bi-exclamation-triangle-fill text-warning fs-3 mb-2"></i>
            <p>No issues found for this project.</p>
          </div>
        )}
        {activeTab === 'SPENT-TIME' && (
          <div className="text-center py-4 text-muted">
            <i className="bi bi-clock-history text-success fs-3 mb-2"></i>
            <p>Time tracking data will appear here.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
