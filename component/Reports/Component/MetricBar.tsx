import CommonModal from '@/common/modals/CommonModal';
import { MetricType } from '@/types/report/metric.type';
import { useState } from 'react';
import { ProgressBar } from 'react-bootstrap';
import ProjectOverview from '../Details/ProjectOverview';

export default function MetricBar({
  item,
  title,
  value,
  total,
  hold,
  completed,
  progress,
}: MetricType) {
  const calcPercent = (done: number, total: number) =>
    total === 0 ? 0 : Math.round((done / total) * 100);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate, setItemUpdate] = useState();
  const openModal = (item: any) => {
    if (item?.id) {
      setModalShow(true);
      setItemUpdate(item);
    }
  };

  const closeModal = () => {
    setModalShow(false);
  };
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between small text-muted">
        <span
          onClick={() => openModal(item)}
          className="cursor-pointer mb-1 fw-bold"
        >
          {title}
        </span>
        <span>{calcPercent(Number(completed), Number(total))}%</span>
      </div>
      <ProgressBar
        now={calcPercent(Number(completed), Number(total))}
        label={`Progress(${completed})`}
        variant="success"
        className="mb-2"
      />
      <ProgressBar
        now={calcPercent(Number(progress), Number(total))}
        label={`Todo Task(${progress})`}
        variant="primary"
        className="mb-2"
      />
      <ProgressBar
        now={calcPercent(Number(hold), Number(total))}
        label={`Hold Task${hold})`}
        variant="danger"
        className="mb-2"
      />
      <ProgressBar
        now={calcPercent(Number(total), Number(total))}
        label={`Total Task(${total})`}
        variant="info"
        className="mb-2"
      />

      {modalShow && (
        <CommonModal
          show={modalShow}
          onHide={closeModal}
          title="Project Overview"
          size="xl"
          footer={false}
          fullscreen={true}
        >
          <ProjectOverview closeModal={closeModal} itemUpdate={itemUpdate} />
        </CommonModal>
      )}
    </div>
  );
}
