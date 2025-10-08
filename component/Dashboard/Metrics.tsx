'use client';

import { useEffect, useState } from 'react';
import { Badge, Card, Col, ProgressBar, Row } from 'react-bootstrap';
export default function Metrics() {
  const [standups, setStandups] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);

  useEffect(() => {
    setStandups([
      { id: 1, name: 'Azharul Islam', status: 'Completed', date: '2025-10-07' },
      { id: 2, name: 'Rafi Rahman', status: 'Pending', date: '2025-10-07' },
      { id: 3, name: 'Sadia Akter', status: 'Completed', date: '2025-10-07' },
    ]);

    setAttendance([
      {
        id: 1,
        name: 'Azharul Islam',
        checkIn: '09:02 AM',
        checkOut: '06:12 PM',
        status: 'Regular',
        duration: '9h 10m',
      },
      {
        id: 2,
        name: 'Rafi Rahman',
        checkIn: '09:30 AM',
        checkOut: '05:45 PM',
        status: 'Late',
        duration: '8h 15m',
      },
      {
        id: 3,
        name: 'Sadia Akter',
        checkIn: '09:10 AM',
        checkOut: '06:05 PM',
        status: 'On Leave',
        duration: ' - ',
      },
    ]);
  }, []);

  const projectSummary = [
    { name: 'Customer 360', total: 12, completed: 8 },
    { name: 'Asset Workflow', total: 10, completed: 7 },
    { name: 'APAMS 3.0', total: 14, completed: 12 },
  ];

  const sprintSummary = [
    { project: 'BNPPAMS', active: 2, completed: 4, progress: 70 },
    { project: 'Asset Workflow', active: 1, completed: 2, progress: 60 },
    { project: 'APAMS 3.0', active: 3, completed: 3, progress: 80 },
    { project: 'BNPIMS', active: 2, completed: 4, progress: 70 },
  ];

  const calcPercent = (done: number, total: number) =>
    total === 0 ? 0 : Math.round((done / total) * 100);

  const gradients = {
    blueGradient: 'linear-gradient(135deg, #1E3C72 0%, #2A5298 100%)',
    tealGradient: 'linear-gradient(135deg, #033946ff 0%, #024055ff 100%)',
    purpleGradient: 'linear-gradient(135deg, #53119bff 0%, #09409eff 100%)',
    greenGradient: 'linear-gradient(135deg,  #04682aff 0%,   #058b80ff 100%)',
  };

  const metricCards = [
    {
      title: 'Total Projects',
      value: '3',
      icon: 'bi-kanban-fill',
      color: 'primary',
      gradient: gradients.blueGradient,
      details: (
        <div className="mt-3">
          {projectSummary.map((proj, i) => {
            const percent = calcPercent(proj.completed, proj.total);
            return (
              <div key={i} className="mb-3">
                <div className="d-flex justify-content-between small">
                  <span>{proj.name}</span>
                  <span>{percent}% Completed</span>
                </div>
                <ProgressBar
                  now={percent}
                  label={`${percent}%`}
                  variant={percent > 80 ? 'success' : 'info'}
                />
              </div>
            );
          })}
        </div>
      ),
    },
    {
      title: 'Active Sprints',
      value: '4',
      icon: 'bi-lightning-charge-fill',
      color: 'info',
      gradient: gradients.tealGradient,
      details: (
        <div className="mt-3">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Project</th>
                <th>Active</th>
                <th>Completed</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {sprintSummary.map((s, i) => (
                <tr key={i}>
                  <td>{s.project}</td>
                  <td>{s.active}</td>
                  <td>{s.completed}</td>
                  <td>
                    <ProgressBar
                      now={s.progress}
                      label={`${s.progress}%`}
                      variant="info"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: 'Daily Standups',
      value: standups.length.toString(),
      icon: 'bi-people-fill',
      color: 'secondary',
      gradient: gradients.purpleGradient,
      details: (
        <div className="mt-3">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {standups.map((s) => (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>
                    <Badge
                      bg={s.status === 'Completed' ? 'success' : 'warning'}
                    >
                      {s.status}
                    </Badge>
                  </td>
                  <td>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
    {
      title: 'Attendance Today',
      value: attendance.length.toString(),
      icon: 'bi-calendar-check-fill',
      color: 'success',
      gradient: gradients.greenGradient,
      details: (
        <div className="mt-3">
          <table className="table-custom">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.checkIn}</td>
                  <td>{a.checkOut}</td>
                  <td>
                    <Badge
                      bg={
                        a.status === 'Regular'
                          ? 'success'
                          : a.status === 'On Leave'
                          ? 'info'
                          : a.status === 'Late'
                          ? 'danger'
                          : 'secondary'
                      }
                    >
                      {a.status}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg="dark">{a.duration}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ),
    },
  ];

  return (
    <div className="container-fluid py-4 px-3 dashboard-container">
      <Row className="g-4 mb-4">
        {metricCards.map((item, idx) => (
          <Col key={idx} xs={12} md={6} lg={6}>
            <Card
              className="metric-card border-0 shadow-lg text-white rounded-4 h-100"
              style={{
                background: item.gradient,
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between border-bottom pb-1">
                  <div>
                    <div className="small opacity-75">{item.title}</div>
                    <h3 className="fw-bold mt-2">{item.value}</h3>
                  </div>
                  <div className="rounded-circle d-flex align-items-center justify-content-center shadow-sm icon-wrapper">
                    <i
                      className={`bi ${item.icon} fs-3 text-${item.color}`}
                    ></i>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-3 shadow-sm animate__animated animate__fadeIn details-box">
                  {item.details}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
