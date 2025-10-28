'use client';

import { sprintTypeMap } from '@/enums/sprintTypes';
import { taskStatuseMap } from '@/enums/taskStatuses';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjectRoadmapReport } from '@/redux/slices/reportSlice';
import { useEffect, useState } from 'react';
import {
  Badge,
  Card,
  Col,
  Collapse,
  ListGroup,
  OverlayTrigger,
  ProgressBar,
  Row,
  Tooltip,
} from 'react-bootstrap';

export default function ProjectRoadmap({ itemUpdate }: any) {
  const dispatch = useAppDispatch();
  const { projectRoadmapReport } = useAppSelector((state) => state.reports);
  const [tableData, setTableData] = useState<any[]>([]);
  const [openSprint, setOpenSprint] = useState<string | null>(null);

  useEffect(() => {
    if (itemUpdate?.id) {
      dispatch(fetchProjectRoadmapReport(itemUpdate.id));
    }
  }, [dispatch, itemUpdate]);

  useEffect(() => {
    const transformed = projectRoadmapReport?.map((prr: any) => ({
      sprintId: prr.sprintId,
      sprintName: prr.sprintName,
      startDate: prr.startDate,
      endDate: prr.endDate,
      sprintType: sprintTypeMap[prr.sprintType],
      taskList: prr.taskList || [],
      closed: prr.closed ?? 0,
      open: prr.open ?? 0,
      hold: prr.hold ?? 0,
    }));
    setTableData(transformed || []);
  }, [projectRoadmapReport]);

  const calculateProgress = (taskList: any[]) => {
    if (!taskList.length) return 0;
    const completed = taskList.filter(
      (t) => t.taskStatus === 'COMPLETED',
    ).length;
    return Math.round((completed / taskList.length) * 100);
  };

  const calculateTaskStatus = (taskList: any[], status: any) => {
    if (!taskList.length) return 0;
    const completed = taskList.filter((t) => t.taskStatus === status).length;
    return Math.round(completed);
  };

  const toggleSprint = (id: string) =>
    setOpenSprint(openSprint === id ? null : id);

  return (
    <div className="p-3">
      {tableData.map((sprint) => {
        const progress = calculateProgress(sprint.taskList);
        const completed = calculateTaskStatus(sprint.taskList, 'COMPLETED');
        const onProgress = calculateTaskStatus(sprint.taskList, 'IN_PROGRESS');
        const onHold = calculateTaskStatus(sprint.taskList, 'HOLD');
        const isOpen = openSprint === sprint.sprintId;

        return (
          <Card
            key={sprint.sprintId}
            className="mb-4 border-0 shadow-sm rounded-4 transition-all"
            style={{
              transition: 'all 0.3s ease',
              background: isOpen ? 'var(--bs-light)' : 'var(--bs-body-bg)',
            }}
          >
            <Card.Header
              onClick={() => toggleSprint(sprint.sprintId)}
              className={`d-flex justify-content-between align-items-center py-3 px-4 rounded-top-4 ${
                isOpen ? 'bg-light' : 'bg-body-tertiary'
              }`}
              style={{ cursor: 'pointer', transition: 'background 0.3s ease' }}
            >
              <div className="d-flex align-items-center gap-3">
                <i className="bi bi-flag-fill text-warning fs-5"></i>
                <div>
                  <h6 className="fw-semibold text-dark mb-0">
                    {sprint.sprintName}
                  </h6>
                  <small className="text-muted">
                    <i className="bi bi-calendar3 me-1"></i>
                    {sprint.startDate} → {sprint.endDate}
                  </small>
                </div>
              </div>

              <div className="d-flex align-items-center gap-3">
                <Badge
                  bg={
                    sprint.sprintType === 'Completed'
                      ? 'success'
                      : sprint.sprintType === 'Planned'
                      ? 'info'
                      : 'secondary'
                  }
                  className="px-3 py-2 text-uppercase shadow-sm"
                >
                  {sprint.sprintType}
                </Badge>
                <i
                  className={`bi ${
                    isOpen ? 'bi-chevron-up' : 'bi-chevron-down'
                  } text-secondary fs-5`}
                ></i>
              </div>
            </Card.Header>

            <Collapse in={isOpen}>
              <div>
                <Card.Body className="px-4 pt-4 pb-3">
                  <Row className="align-items-center mb-3">
                    <Col md={8}>
                      <small className="text-muted fw-medium">
                        <i className="bi bi-graph-up-arrow me-2 text-info"></i>
                        Progress: {progress}%
                      </small>
                      <ProgressBar
                        now={progress}
                        striped
                        variant={progress === 100 ? 'success' : 'info'}
                        className="mt-2 rounded-pill"
                        style={{
                          height: '8px',
                          background:
                            'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)',
                        }}
                      />
                    </Col>
                    <Col md={4} className="text-md-end mt-2 mt-md-0">
                      <div className="d-flex justify-content-md-end justify-content-start gap-3">
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Closed Tasks</Tooltip>}
                        >
                          <span className="text-success fw-medium">
                            <i className="bi bi-check-circle-fill me-1"></i>
                            {completed}
                          </span>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>Open Tasks</Tooltip>}
                        >
                          <span className="text-warning fw-medium">
                            <i className="bi bi-hourglass-split me-1"></i>
                            {onProgress}
                          </span>
                        </OverlayTrigger>
                        <OverlayTrigger
                          placement="top"
                          overlay={<Tooltip>On Hold</Tooltip>}
                        >
                          <span className="text-secondary fw-medium">
                            <i className="bi bi-pause-circle-fill me-1"></i>
                            {onHold}
                          </span>
                        </OverlayTrigger>
                      </div>
                    </Col>
                  </Row>

                  {sprint.taskList.length > 0 ? (
                    <>
                      <h6 className="fw-semibold text-secondary mb-3">
                        <i className="bi bi-list-task me-2 text-primary"></i>
                        Related Tasks
                      </h6>
                      <ListGroup variant="flush">
                        {sprint.taskList.map((task: any, idx: number) => (
                          <ListGroup.Item
                            key={idx}
                            className="d-flex justify-content-between align-items-center px-3 py-2 rounded-3 mb-2 border-0"
                            style={{
                              background: 'rgba(240, 242, 245, 0.7)',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <div>
                              <i className="bi bi-arrow-return-right text-muted me-2"></i>
                              <span className="fw-medium text-dark">
                                {task.taskName}
                              </span>
                              <small className="ms-2 text-muted">
                                <i className="bi bi-person-circle me-1 text-secondary"></i>
                                {task.userName}
                              </small>
                            </div>
                            <Badge
                              bg={
                                task.taskStatus === 'COMPLETED'
                                  ? 'success'
                                  : task.taskStatus === 'IN_PROGRESS'
                                  ? 'info'
                                  : task.taskStatus === 'HOLD'
                                  ? 'warning'
                                  : 'secondary'
                              }
                              className="px-3 py-2"
                            >
                              {taskStatuseMap[task.taskStatus]}
                            </Badge>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </>
                  ) : (
                    <p className="text-muted fst-italic mt-3">
                      <i className="bi bi-info-circle me-2"></i>No tasks
                      available.
                    </p>
                  )}
                </Card.Body>
              </div>
            </Collapse>
          </Card>
        );
      })}
    </div>
  );
}
