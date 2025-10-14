'use client';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjectReport } from '@/redux/slices/reportSlice';
import { useEffect, useState } from 'react';
import Metric from '../Reports/Component/Metric';
import MetricBar from '../Reports/Component/MetricBar';

export default function ProjectReport() {
  const dispatch = useAppDispatch();
  const { projectReport, loading, error } = useAppSelector(
    (state) => state.reports,
  );
  const [projectSummary, setProjectSummary] = useState<
    {
      id: string;
      name: string;
      totalTasks: number;
      completedTasks: number;
      inProgressTasks: number;
      onHoldTasks: number;
    }[]
  >([]);

  useEffect(() => {
    dispatch(fetchProjectReport());
  }, [dispatch]);

  useEffect(() => {
    if (projectReport?.length > 0) {
      const projectData = projectReport.map((pr: any) => ({
        id: pr?.id,
        name: pr?.name,
        totalTasks: pr?.totalTasks || 0,
        completedTasks: pr?.completedTasks || 0,
        inProgressTasks: pr?.inProgressTasks || 0,
        onHoldTasks: pr?.onHoldTasks,
      }));
      setProjectSummary(projectData);
    }
  }, [projectReport]);

  console.log('projectReport', projectReport);

  if (loading) return <p>Loading project report...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <Metric
      title="Projects"
      value={projectSummary?.length}
      icon="bi-briefcase-fill"
      color="primary"
    >
      {projectSummary.map((proj, i) => {
        return (
          <MetricBar
            title={proj?.name}
            total={proj.totalTasks}
            progress={proj?.inProgressTasks}
            hold={proj?.onHoldTasks}
            completed={proj.completedTasks}
          />
        );
      })}
    </Metric>
  );
}
