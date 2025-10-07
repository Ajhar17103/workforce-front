'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import PermissionGuard from '@/lib/PermissionGuard';
import { useState } from 'react';
import Create from './DailyStandupCreate';
import Table from './DailyStandupTable';

export default function DailyStandupPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="card shadow-sm p-3 dark">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold text-blue">Daily Standup Lists</h6>
        <PermissionGuard action="add">
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-plus-lg"
            variant="outline-primary"
            onClick={() => setModalShow(true)}
            tooltip="Add New Daily Standup"
          />
        </PermissionGuard>
      </div>
      <Table />

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="Create Daily Standup"
          size="lg"
          footer={false}
          fullscreen="xl-down"
        >
          <Create closeModal={() => closeModal()} />
        </CommonModal>
      )}
    </div>
  );
}
