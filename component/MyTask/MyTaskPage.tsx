'use client';

import CustomButton from '@/common/Buttons/Button';
import CommonModal from '@/common/modals/CommonModal';
import PermissionGuard from '@/lib/PermissionGuard';
import { useState } from 'react';
import Create from './MyTaskCreate';

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
      <div className="card shadow-sm p-3 dark">
        <div className="d-flex justify-content-start align-items-center gap-2 mb-3">
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-circle"
            variant={activeTab === 'todo' ? 'secondary' : 'outline-secondary'}
            tooltip="To-Do"
            className={activeTab === 'todo' ? 'text-light' : 'text-secondary'}
            onClick={() => setActiveTab('todo')}
          />
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-arrow-repeat"
            variant={activeTab === 'inprogress' ? 'warning' : 'outline-warning'}
            tooltip="In-Progress"
            className={
              activeTab === 'inprogress' ? 'text-light' : 'text-warning'
            }
            onClick={() => setActiveTab('inprogress')}
          />
          <CustomButton
            size="xs"
            loading={false}
            icon="bi bi-check-circle"
            variant={activeTab === 'completed' ? 'success' : 'outline-success'}
            tooltip="Completed"
            className={
              activeTab === 'completed' ? 'text-light' : 'text-success'
            }
            onClick={() => setActiveTab('completed')}
          />
        </div>

        <div>
          {activeTab === 'todo' && (
            <div>
              <h6 className="mb-3">To-Do Tasks</h6>
              {/* Replace with your table component */}
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Assignee</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Design Homepage</td>
                    <td>Azhar</td>
                    <td>25 Aug</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'inprogress' && (
            <div>
              <h6 className="mb-3">In-Progress Tasks</h6>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Assignee</th>
                    <th>Progress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>API Integration</td>
                    <td>Rahim</td>
                    <td>60%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'completed' && (
            <div>
              <h6 className="mb-3">Completed Tasks</h6>
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Task</th>
                    <th>Assignee</th>
                    <th>Completed On</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Database Setup</td>
                    <td>Karim</td>
                    <td>18 Aug</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
