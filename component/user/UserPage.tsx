'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import { useState } from 'react';
import CreateForm from './UserCreate';

export default function UserPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="card shadow-sm p-3 dark">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold text-blue">User Lists</h6>
        <CustomButton
          size="xs"
          loading={false}
          icon="bi bi-plus-lg"
          variant="outline-primary"
          onClick={() => setModalShow(true)}
          tooltip="Add New Role"
        />
      </div>
      <h6 className="p-5 text-center">Development under construction</h6>
      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="Create User"
          size="xl"
          footer={false}
          fullscreen={'xl-down'}
        >
          <CreateForm closeModal={() => closeModal()} />
        </CommonModal>
      )}
    </div>
  );
}
