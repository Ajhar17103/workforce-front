import DynamicTable from '@/common/tables/DataTable';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProjectTimeSpentReport } from '@/redux/slices/reportSlice';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import { tableTimeSpentSchema } from './ProjectOverviewSchema';

const getBadgeVariant = (type: string): string => {
  switch (type) {
    case 'ACTIVE':
      return 'success';
    case 'COMPLETED':
      return 'primary';
    case 'PENDING':
      return 'warning';
    default:
      return 'secondary';
  }
};

export default function ProjectTimeSpent({ itemUpdate }: any) {
  const dispatch = useAppDispatch();
  const { projectTimeSpentReport } = useAppSelector((state) => state.reports);
  const [tableData, setTableData] = useState<any[]>([]);

  useEffect(() => {
    if (itemUpdate?.id) {
      dispatch(fetchProjectTimeSpentReport(itemUpdate.id));
    }
  }, [dispatch, itemUpdate]);

  useEffect(() => {
    const transformed: any[] = projectTimeSpentReport?.map((ptsp) => (
      {
      id: ptsp?.sprintId,
      sprintId: ptsp?.sprintId,
      sprintName: ptsp?.sprintName,
      projectId: ptsp?.projectId,
      projectName: ptsp?.projectName,
      startDate: ptsp?.startDate,
      endDate: ptsp?.endDate,
      sprintType: ptsp?.sprintType,
      allocatedTime: ptsp?.allocatedTime,
      spentTime: ptsp?.spentTime,
      users: ptsp?.users,
    }));
    setTableData(transformed);
  }, [projectTimeSpentReport]);

  return (
    <div className="p-3">
      {tableData?.length === 0 && (
        <p className="text-muted fst-italic">No sprint data available.</p>
      )}

      {tableData?.map((sprint) => (
        <Card key={sprint.sprintId} className="mb-4 shadow-sm border-0">
          <Card.Header className="bg-white border-bottom">
            <Row>
              <Col md={6}>
                <h6 className="fw-semibold mb-0">{sprint.sprintName}</h6>
                <small className="text-muted">
                  {sprint.startDate} → {sprint.endDate}
                </small>
              </Col>
              <Col md={6} className="text-end">
                <Badge bg={getBadgeVariant(sprint.sprintType)} className="me-2">
                  {sprint.sprintType}
                </Badge>

                <small className="text-muted d-inline-flex align-items-center me-2">
                  <i className="bi bi-clock-history me-1"></i>
                  {sprint.allocatedTime ?? 0}h
                </small>

                <small className="text-muted d-inline-flex align-items-center me-2">
                  <i className="bi bi-hourglass-split me-1"></i>
                  <span className="fw-semibold text-dark">
                    {sprint.spentTime ?? 0}h
                  </span>{' '}
                </small>
              </Col>
            </Row>
          </Card.Header>

          <Card.Body className="bg-light">
            <DynamicTable
              columns={tableTimeSpentSchema}
              data={sprint.users.length > 0 ? sprint?.users : []}
              action={false}
              pagination={true}
            />
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
