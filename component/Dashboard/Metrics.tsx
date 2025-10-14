'use client';

import { Col, Row } from 'react-bootstrap';
import AttendanceReport from '../Reports/AttendanceReport';
import ProjectReport from '../Reports/ProjectReport';
import ScrumReport from '../Reports/ScrumReport';
import SprintReport from '../Reports/SprintReport';

export default function Metrics() {
  const metricCards = [
    {
      id: 1,
      component: <ProjectReport />,
    },

    {
      id: 2,
      component: <SprintReport />,
    },
    {
      id: 3,
      component: <ScrumReport />,
    },
    {
      id: 4,
      component: <AttendanceReport />,
    },
  ];

  return (
    <Row className="g-4">
      {metricCards.map((item, idx) => (
        <Col key={idx} xs={12} md={6} lg={6}>
          {item?.component}
        </Col>
      ))}
    </Row>
  );
}
