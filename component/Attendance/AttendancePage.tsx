'use client';

import CustomButton from '@/common/Buttons/Button';
import { Toast } from '@/common/messages/toast';
import CommonModal from '@/common/modals/CommonModal';
import axiosInstance from '@/lib/axiosInstance';
import PermissionGuard from '@/lib/PermissionGuard';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAttendanceByUserIdAndWorkDate } from '@/redux/slices/attendanceSlice';
import { AttendanceDto, Event } from '@/types/attendance/attendance.type';
import { getAttendanceApiUrl } from '@/utils/api';
import { handleApiError } from '@/utils/errorHandler';
import { getCurrentLocation } from '@/utils/getCurrentLocation';
import { getLocalTimestamp } from '@/utils/getLocalTimestamp';
import { getTotalTimeSinceEvent } from '@/utils/getTotalTimeSinceEvent';
import { getSessionStorage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';

export default function AttendancePage() {
  const attendanceUrl = getAttendanceApiUrl('/attendances');
  const dispatch = useAppDispatch();
  const user_id = getSessionStorage('user_id');
  const { userWorkWiseDateAttendance } = useAppSelector(
    (state) => state.attendance,
  );
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [outingReason, setOutingReason] = useState<string>('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceDto>();
  const today = new Date();

  useEffect(() => {
    if (user_id) {
      let postData = {
        userId: user_id,
        workDate: today.toLocaleDateString('en-CA'),
      };
      dispatch(fetchAttendanceByUserIdAndWorkDate(postData));
    }
  }, [user_id]);

  useEffect(() => {
    if (userWorkWiseDateAttendance) {
      const mapped: AttendanceDto = {
        id: userWorkWiseDateAttendance.id,
        userId: userWorkWiseDateAttendance.userId,
        workDate: userWorkWiseDateAttendance.workDate,
        staySeconds: String(userWorkWiseDateAttendance.staySeconds ?? '0'),
        status: userWorkWiseDateAttendance.status,
        events:
          userWorkWiseDateAttendance.events?.map((event: any) => ({
            id: event.id,
            attendanceId: event.attendanceId,
            type: event.type,
            timestamp: event.timestamp,
            lat: String(event.lat),
            lng: String(event.lng),
            remarks: event.remarks ?? '',
          })) ?? [],
      };

      setAttendanceRecords(mapped);
    }
  }, [userWorkWiseDateAttendance]);

  const hasStartDay =
    attendanceRecords?.events?.some((event) => event.type === 'DAY_START') ??
    false;

  const hasStartBreak =
    attendanceRecords?.events?.some((event) => event.type === 'BREAK_START') ??
    false;

  const hasStartOuting =
    attendanceRecords?.events?.some((event) => event.type === 'OUTING_START') ??
    false;

  const handleOutingSubmit = () => {
    closeModal();
  };

  const getTimelineColor = (type: Event['type']) => {
    switch (type) {
      case 'DAY_START':
        return 'bg-success';
      case 'BREAK_START':
        return 'bg-warning';
      case 'BREAK_END':
        return 'bg-primary';
      case 'OUTING_START':
        return 'bg-info';
      case 'OUTING_END':
        return 'bg-secondary';
      case 'DAY_END':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  };

  const handleAttendanceAction = async (action: string) => {
    const { lat, lng } = await getCurrentLocation();
    const totalDaySeconds = getTotalTimeSinceEvent(
      attendanceRecords,
      'DAY_START',
    );
    if (action === 'DAY_START' && user_id) {
      const postData = {
        userId: user_id,
        workDate: today.toLocaleDateString('en-CA'),
        status: 'OPEN',
        events: [
          {
            type: action,
            timestamp: getLocalTimestamp(),
            lat: lat,
            lng: lng,
            remarks: 'Starting a Day',
          },
        ],
      };

      axiosInstance
        .post(attendanceUrl, postData)
        .then((response) => {
          Toast({
            message: 'Attendance has been saved Successful!',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchAttendanceByUserIdAndWorkDate(postData));
        })
        .catch((error) => {
          handleApiError(error, 'Failed to create project!');
          console.error(error);
        });
    } else if (action === 'DAY_END' && user_id && attendanceRecords?.id) {
      const postData = {
        userId: user_id,
        workDate: today.toLocaleDateString('en-CA'),
        staySeconds: totalDaySeconds,
        status: 'CLOSED',
        events: [
          {
            type: action,
            timestamp: getLocalTimestamp(),
            lat: lat,
            lng: lng,
            remarks: 'Ending a Day',
          },
        ],
      };

      axiosInstance
        .put(`${attendanceUrl}/${attendanceRecords?.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Attendance has been saved Successful',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchAttendanceByUserIdAndWorkDate(postData));
        })
        .catch((error) => {
          handleApiError(error, 'Failed to create project!');
          console.error(error);
        });
    } else if (action === 'BREAK_START' && user_id && attendanceRecords?.id) {
      const postData = {
        userId: user_id,
        workDate: today.toLocaleDateString('en-CA'),
        staySeconds: totalDaySeconds,
        status: 'OPEN',
        events: [
          {
            type: action,
            timestamp: getLocalTimestamp(),
            lat: lat,
            lng: lng,
            remarks: 'Starting a Break',
          },
        ],
      };

      axiosInstance
        .put(`${attendanceUrl}/${attendanceRecords?.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Attendance has been saved Successful',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchAttendanceByUserIdAndWorkDate(postData));
        })
        .catch((error) => {
          handleApiError(error, 'Failed to create project!');
          console.error(error);
        });
    } else if (action === 'BREAK_END' && user_id && attendanceRecords?.id) {
      const postData = {
        userId: user_id,
        workDate: today.toLocaleDateString('en-CA'),
        staySeconds: totalDaySeconds,
        status: 'OPEN',
        events: [
          {
            type: action,
            timestamp: getLocalTimestamp(),
            lat: lat,
            lng: lng,
            remarks: 'Ending a Break',
          },
        ],
      };

      axiosInstance
        .put(`${attendanceUrl}/${attendanceRecords?.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Attendance has been saved Successful',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchAttendanceByUserIdAndWorkDate(postData));
        })
        .catch((error) => {
          handleApiError(error, 'Failed to create project!');
          console.error(error);
        });
    } else if (action === 'OUTING_START' && user_id && attendanceRecords?.id) {
      const postData = {
        userId: user_id,
        workDate: today.toLocaleDateString('en-CA'),
        staySeconds: totalDaySeconds,
        status: 'OPEN',
        events: [
          {
            type: action,
            timestamp: getLocalTimestamp(),
            lat: lat,
            lng: lng,
            remarks: 'Going for Outing',
          },
        ],
      };

      axiosInstance
        .put(`${attendanceUrl}/${attendanceRecords?.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Attendance has been saved Successful',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchAttendanceByUserIdAndWorkDate(postData));
        })
        .catch((error) => {
          handleApiError(error, 'Failed to create project!');
          console.error(error);
        });
    } else if (action === 'OUTING_END' && user_id && attendanceRecords?.id) {
      const postData = {
        userId: user_id,
        workDate: today.toLocaleDateString('en-CA'),
        staySeconds: totalDaySeconds,
        status: 'OPEN',
        events: [
          {
            type: action,
            timestamp: getLocalTimestamp(),
            lat: lat,
            lng: lng,
            remarks: 'Back to office',
          },
        ],
      };

      axiosInstance
        .put(`${attendanceUrl}/${attendanceRecords?.id}`, postData)
        .then((response) => {
          Toast({
            message: 'Attendance has been saved Successful',
            type: 'success',
            autoClose: 1500,
            theme: 'colored',
          });
          dispatch(fetchAttendanceByUserIdAndWorkDate(postData));
        })
        .catch((error) => {
          handleApiError(error, 'Failed to create project!');
          console.error(error);
        });
    }
  };

  const closeModal = () => {
    setModalShow(false);
    setOutingReason('');
    setProofFile(null);
  };

  return (
    <div className="card shadow-sm p-3 dark">
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h5 className="fw-bold text-blue mb-2 mb-md-0">Attendance</h5>
        <PermissionGuard action="add">
          <CustomButton
            size="xs"
            icon="bi-arrow-clockwise"
            variant="outline-primary"
            tooltip="Refresh Current Location"
          />
        </PermissionGuard>
      </div>

      <Row className="g-3 mb-4">
        <Col xs={12} md={12}>
          <div className="d-flex justify-content-start gap-2 mb-2">
            {!hasStartDay && (
              <Button
                variant="success"
                className="d-flex align-items-center gap-1"
                onClick={() => handleAttendanceAction('DAY_START')}
              >
                <i className="bi bi-play-circle-fill"></i> Start Day
              </Button>
            )}

            {hasStartDay && !hasStartBreak && (
              <Button
                variant="warning"
                className="d-flex align-items-center gap-1 text-white"
                onClick={() => handleAttendanceAction('BREAK_START')}
              >
                <i className="bi bi-clock-history"></i> Take Break
              </Button>
            )}
            {hasStartDay && hasStartBreak && (
              <Button
                variant="primary"
                className="d-flex align-items-center gap-1"
                onClick={() => handleAttendanceAction('BREAK_END')}
              >
                <i className="bi bi-check-circle-fill"></i> End Break
              </Button>
            )}

            {hasStartDay && !hasStartOuting && (
              <Button
                variant="info"
                className="d-flex align-items-center gap-1 text-white"
                onClick={() => handleAttendanceAction('OUTING_START')}
              >
                <i className="bi bi-geo-alt-fill"></i> Going to Outing
              </Button>
            )}

            {hasStartDay && hasStartOuting && (
              <Button
                variant="secondary"
                className="d-flex align-items-center gap-1 text-white"
                onClick={() => handleAttendanceAction('OUTING_END')}
              >
                <i className="bi bi-geo-alt-fill"></i> Back to Office
              </Button>
            )}

            {hasStartDay && (
              <Button
                variant="danger"
                className="d-flex align-items-center gap-1"
                onClick={() => handleAttendanceAction('DAY_END')}
              >
                <i className="bi bi-stop-circle-fill"></i> End Day
              </Button>
            )}
          </div>
        </Col>

        <Col xs={12} md={6}>
          <Card className="p-3  border-none">
            {attendanceRecords?.events?.length === 0 ? (
              <p className="text-muted">No attendance actions yet.</p>
            ) : (
              <ul className="timeline list-unstyled border-start border-2">
                {attendanceRecords?.events?.map((record, idx) => (
                  <li key={idx} className="mb-4 position-relative">
                    <span
                      className={`position-absolute top-0 start-0 translate-middle p-2 rounded-circle ${getTimelineColor(
                        record.type,
                      )}`}
                    ></span>
                    <div className="ms-4">
                      <strong>{record.type}</strong>
                      <div className="text-muted small">
                        {new Date(record.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        {record.lat &&
                          record.lng &&
                          `- ${record.lat}, ${record.lng}`}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </Col>

        <Col xs={12} md={6}>
          
        </Col>
      </Row>

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Outing Submission"
          size="lg"
          footer={false}
          fullscreen="xl-down"
        >
          <div className="p-3">
            <h5 className="mb-3">Submit Outing Proof</h5>
            <div className="mb-3">
              <label className="form-label">Reason for Outing</label>
              <input
                type="text"
                className="form-control"
                value={outingReason}
                onChange={(e) => setOutingReason(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Upload Proof</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setProofFile(e.target.files?.[0] || null)}
              />
            </div>
            <div className="d-flex justify-content-end gap-2 flex-wrap">
              <Button variant="secondary" onClick={closeModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleOutingSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </CommonModal>
      )}
    </div>
  );
}
