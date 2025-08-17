'use client';

import CustomButton from '@/common/Buttons/Button';
import { useState } from 'react';

export default function ProjectPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal = () => {
    setModalShow(false);
  };

  return (
    <div className="card shadow-sm p-3 dark">
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="mb-0 fw-semibold text-blue">Project Lists</h6>
        <CustomButton
          size="xs"
          loading={false}
          icon="bi bi-plus-lg"
          variant="outline-primary"
          onClick={() => setModalShow(true)}
          tooltip="Add New Project"
        />
      </div>
      <h6 className="p-5 text-center">Development under construction</h6>
    </div>
  );
}
