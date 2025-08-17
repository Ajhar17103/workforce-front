'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import { useState } from 'react';
import CreateForm from './DepartmentCreate';
import Table from './DepartmentTable';

export default function DepartmentPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="card shadow-sm p-3 dark">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold text-blue">Department Lists</h6>
        <CustomButton
          size="xs"
          loading={false}
          icon="bi bi-plus-lg"
          variant="outline-primary"
          onClick={() => setModalShow(true)}
          tooltip="Add New Department"
        />
      </div>

      <Table />

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="Create Department"
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
