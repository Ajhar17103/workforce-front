'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import { useState } from 'react';
import MenuCreate from './MenuCreate';
import MenuTable from './MenuTable';

export default function MenuPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="card shadow-lg p-3 dark">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold text-blue">Menus Lists</h6>
        <CustomButton
          size="xs"
          loading={false}
          icon="bi bi-plus-lg"
          variant="outline-primary"
          onClick={() => setModalShow(true)}
          tooltip="Add New Menu"
        />
      </div>
      <MenuTable />

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="Create Menu"
          size="xl"
          footer={false}
          fullscreen={'xl-down'}
        >
          <MenuCreate closeModal={() => closeModal()} />
        </CommonModal>
      )}
    </div>
  );
}
