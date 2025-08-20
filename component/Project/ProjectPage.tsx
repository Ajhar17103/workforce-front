'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import PermissionGuard from '@/lib/PermissionGuard';
import { useState } from 'react';
import Create from './ProjectCreate';
import Table from './ProjectTable';

export default function ProjectPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="card shadow-lg p-3 dark">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold text-blue">Project Lists</h6>
        <PermissionGuard action="add">
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-plus-lg"
            variant="outline-primary"
            onClick={() => setModalShow(true)}
            tooltip="Add New Project"
          />
        </PermissionGuard>
      </div>
      <Table />

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="Create Project"
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
