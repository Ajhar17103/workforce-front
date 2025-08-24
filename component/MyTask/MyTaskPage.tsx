'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import PermissionGuard from '@/lib/PermissionGuard';
import { useState } from 'react';
import Create from './MyTaskCreate';
import MyTaskTable from './MyTaskTable';

export default function MyTaskPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'todo' | 'inprogress' | 'completed'>('todo');

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div>
      <div className="card shadow-sm p-2 dark mb-2">
        <div className="d-flex justify-content-between align-items-center">
          <h6 className="mb-0 fw-semibold text-blue">My Task Lists</h6>
          <PermissionGuard action="add">
            <CustomButton
              size="xs"
              loading={false}
              icon="bi bi-plus-lg"
              variant="outline-primary"
              onClick={() => setModalShow(true)}
              tooltip="Add New Unplanned Task"
            />
          </PermissionGuard>
        </div>

        {modalShow && (
          <CommonModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            title="Create Unplanned Task"
            size="xl"
            footer={false}
            fullscreen="xl-down"
          >
            <Create closeModal={() => closeModal()} />
          </CommonModal>
        )}
      </div>
      <MyTaskTable />
    </div>
  );
}
