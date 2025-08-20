'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import { useState } from 'react';
import CreateForm from './DesignationCreate';
import Table from './DesignationTable';
import PermissionGuard from '@/lib/PermissionGuard';

export default function DesignationPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="card shadow-sm p-3 dark">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold text-blue">Designation Lists</h6>
        <PermissionGuard action="add">
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-plus-lg"
            variant="outline-primary"
            onClick={() => setModalShow(true)}
            tooltip="Add New Designation"
          />
        </PermissionGuard>
      </div>

      <Table />

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="Create Designation"
          size="lg"
          footer={false}
          fullscreen={'xl-down'}
        >
          <CreateForm closeModal={() => closeModal()} />
        </CommonModal>
      )}
    </div>
  );
}
