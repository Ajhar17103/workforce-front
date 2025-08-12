import CustomButton from '@/common/Button/Button';
import CommonModal from '@/common/modal/CommonModal';
import { useState } from 'react';
import MenuCreate from './MenuCreate';
import MenuTable from './MenuTable';

export default function MenuPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="card shadow-sm p-3 dark">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold text-primary">Menus List</h6>
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
    </div>
  );
}
