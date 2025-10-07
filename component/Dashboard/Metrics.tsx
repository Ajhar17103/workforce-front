'use client';

import { useEffect, useState } from 'react';
import { Badge, Card, Col, ProgressBar, Row, Table } from 'react-bootstrap';

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
        duration: '9h 10m',
      },
      {
        id: 2,
        name: 'Rafi Rahman',
        checkIn: '09:30 AM',
        checkOut: '05:45 PM',
        duration: '8h 15m',
      },
      {
        id: 3,
        name: 'Sadia Akter',
        checkIn: '09:10 AM',
        checkOut: '06:05 PM',
        duration: '8h 55m',
      },
    ]);
  }, []);

  const projectSummary = [
    { name: 'Customer 360', total: 12, completed: 8 },
    { name: 'Asset Workflow', total: 10, completed: 7 },
    { name: 'APAMS 3.0', total: 14, completed: 12 },
  ];

  const sprintSummary = [
    { project: 'Customer 360', active: 2, completed: 4, progress: 70 },
    { project: 'Asset Workflow', active: 1, completed: 2, progress: 60 },
    { project: 'APAMS 3.0', active: 3, completed: 3, progress: 80 },
  ];

  const taskSummary = [
    { project: 'Customer 360', todo: 10, inProgress: 15, done: 25 },
    { project: 'Asset Workflow', todo: 7, inProgress: 12, done: 21 },
    { project: 'APAMS 3.0', todo: 5, inProgress: 8, done: 27 },
  ];

  const calcPercent = (done: number, total: number) =>
    total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <div className="container-fluid py-4 px-3 dashboard-container">
      <Row className="g-4 mb-5">
        {[
          {
            title: 'Total Projects',
            value: '24',
            icon: 'bi-kanban-fill',
            color: 'primary',
            gradient: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
          },
          {
            title: 'Active Sprints',
            value: '8',
            icon: 'bi-lightning-charge-fill',
            color: 'info',
            gradient: 'linear-gradient(135deg, #16a085 0%, #27ae60 100%)',
          },
          {
            title: 'Tasks in Progress',
            value: '142',
            icon: 'bi-list-task',
            color: 'warning',
            gradient: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
          },
          {
            title: 'Daily Standups',
            value: standups.length.toString(),
            icon: 'bi-people-fill',
            color: 'secondary',
            gradient: 'linear-gradient(135deg, #00b4db 0%, #0083b0 100%)',
          },
          {
            title: 'Attendance Today',
            value: attendance.length.toString(),
            icon: 'bi-calendar-check-fill',
            color: 'success',
            gradient: 'linear-gradient(135deg, #56ab2f 0%, #32f1e8ff 100%)',
          },
        ].map((item, idx) => (
          <Col key={idx} xs={12} sm={6} lg={4} xl={4}>
            <Card
              className="metric-card border-0 shadow-lg text-white rounded-4 h-100"
              style={{
                background: item.gradient,
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
            >
              <Card.Body className="p-4">
                <div className="d-flex align-items-center justify-content-between">
                  <div>
                    <div className="small opacity-75">{item.title}</div>
                    <h3 className="fw-bold mt-2">{item.value}</h3>
                  </div>
                  <div
                    className="rounded-circle bg-light d-flex align-items-center justify-content-center shadow-sm"
                    style={{ width: '60px', height: '60px' }}
                  >
                    <i
                      className={`bi ${item.icon} fs-3 text-${item.color}`}
                    ></i>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* <Card className="mb-4 shadow-sm border-0 rounded-4 section-card">
        <Card.Header className="fw-bold bg-white border-bottom py-3">
          <i className="bi bi-kanban text-primary me-2"></i>Project Overview
        </Card.Header>
        <Card.Body className="pt-3">
          {projectSummary.map((proj, i) => {
            const percent = calcPercent(proj.completed, proj.total);
            return (
              <div key={i} className="mb-4">
                <div className="d-flex justify-content-between">
                  <strong className="text-dark">{proj.name}</strong>
                  <span className="text-muted">{percent}% Completed</span>
                </div>
                <ProgressBar
                  now={percent}
                  label={`${percent}%`}
                  variant={
                    percent > 80 ? 'success' : percent > 50 ? 'info' : 'warning'
                  }
                  style={{ height: '10px', borderRadius: '10px' }}
                />
              </div>
            );
          })}
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm border-0 rounded-4 section-card">
        <Card.Header className="fw-bold bg-white border-bottom py-3">
          <i className="bi bi-lightning text-info me-2"></i> Sprint Progress
        </Card.Header>
        <Card.Body>
          <Table hover responsive bordered className="align-middle">
            <thead className="table-light">
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
                  <td>
                    <strong>{s.project}</strong>
                  </td>
                  <td>{s.active}</td>
                  <td>{s.completed}</td>
                  <td style={{ width: '35%' }}>
                    <ProgressBar
                      now={s.progress}
                      label={`${s.progress}%`}
                      variant="info"
                      style={{ height: '8px' }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm border-0 rounded-4 section-card">
        <Card.Header className="fw-bold bg-white border-bottom py-3">
          <i className="bi bi-list-task text-warning me-2"></i>Task Summary
        </Card.Header>
        <Card.Body>
          <Table hover responsive bordered className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Project</th>
                <th>To Do</th>
                <th>In Progress</th>
                <th>Completed</th>
                <th>Progress</th>
              </tr>
            </thead>
            <tbody>
              {taskSummary.map((t, i) => {
                const total = t.todo + t.inProgress + t.done;
                const percent = calcPercent(t.done, total);
                return (
                  <tr key={i}>
                    <td>
                      <strong>{t.project}</strong>
                    </td>
                    <td>
                      <Badge bg="secondary">{t.todo}</Badge>
                    </td>
                    <td>
                      <Badge bg="info">{t.inProgress}</Badge>
                    </td>
                    <td>
                      <Badge bg="success">{t.done}</Badge>
                    </td>
                    <td style={{ width: '35%' }}>
                      <ProgressBar
                        now={percent}
                        label={`${percent}%`}
                        variant={percent > 80 ? 'success' : 'warning'}
                        style={{ height: '8px' }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Card className="mb-4 shadow-sm border-0 rounded-4 section-card">
        <Card.Header className="fw-bold bg-white border-bottom py-3">
          <i className="bi bi-people text-secondary me-2"></i>Daily Standup
        </Card.Header>
        <Card.Body>
          <Table hover responsive bordered className="align-middle">
            <thead className="table-light">
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
          </Table>
        </Card.Body>
      </Card>

      <Card className="shadow-sm border-0 rounded-4 section-card">
        <Card.Header className="fw-bold bg-white border-bottom py-3">
          <i className="bi bi-calendar-check text-success me-2"></i>Attendance
          Summary
        </Card.Header>
        <Card.Body>
          <Table hover responsive bordered className="align-middle">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Stay Duration</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((a) => (
                <tr key={a.id}>
                  <td>{a.name}</td>
                  <td>{a.checkIn}</td>
                  <td>{a.checkOut}</td>
                  <td>
                    <Badge bg="dark">{a.duration}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card> */}
    </div>
  );
}
