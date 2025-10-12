'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import PermissionGuard from '@/lib/PermissionGuard';
import { useState } from 'react';
import AllocateTable from './AllocateLeaveTable';
import LeaveTable from './LeaveTable';
import Create from './ApplyLeave';

export default function MyLeavePage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div>
      <div className="card shadow-sm p-3 dark mb-5">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-semibold text-blue">Allocated Leave Lists</h6>
          <PermissionGuard action="add">
            <CustomButton
              size="xs"
              loading={false}
              icon="bi bi-plus-lg"
              variant="outline-primary"
              onClick={() => setModalShow(true)}
              tooltip="Apply for Leave"
            />
          </PermissionGuard>
        </div>
        <AllocateTable />
      </div>

      <div className="card shadow-sm p-3 dark mb-5">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-semibold text-blue">My Leave Lists</h6>
        </div>
        <LeaveTable />

        {modalShow && (
          <CommonModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            title="Apply for Leave"
            size="xl"
            footer={false}
            fullscreen="xl-down"
          >
            <Create closeModal={() => closeModal()} />
          </CommonModal>
        )}
      </div>
    </div>
  );
}
