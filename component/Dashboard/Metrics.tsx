'use client';

import { Col, Row } from 'react-bootstrap';
import AttendanceReport from '../Reports/AttendanceReport';
import ProjectReport from '../Reports/ProjectReport';
import ScrumReport from '../Reports/ScrumReport';
import SprintReport from '../Reports/SprintReport';
import UserTaskReport from '../Reports/UserTaskReport';

export default function Metrics() {
  const metricCards = [
    {
      id: 1,
      col: 6,
      component: <ProjectReport />,
    },

    {
      id: 2,
      col: 6,
      component: <SprintReport />,
    },
    {
      id: 5,
      col: 12,
      component: <UserTaskReport />,
    },
    {
      id: 3,
      col: 6,
      component: <ScrumReport />,
    },
    {
      id: 4,
      col: 6,
      component: <AttendanceReport />,
    },
  ];

  return (
    <Row className="g-4">
      {metricCards.map((item, idx) => (
        <Col key={idx} xs={12} md={6} lg={item?.col}>
          {item?.component}
        </Col>
      ))}
    </Row>
  );
}
