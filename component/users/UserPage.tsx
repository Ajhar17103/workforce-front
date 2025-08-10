import { useState } from "react";
import UserTable from "./UserTable";
import CommonModal from "@/common/modal/CommonModal";
import UserCreate from "./UserCreate";

export default function UserPage() {
  const [modalShow, setModalShow] = useState<boolean>(false);

  const closeModal=()=>{
    setModalShow(false);
  }
  
  return (
  <div className="card shadow-sm p-3">
      <div className="d-flex justify-content-between align-items-center">
    <h5 className="mb-0 fw-semibold text-primary">Users List</h5>
<button
  className="btn btn-sm btn-outline-info d-flex align-items-center gap-2 custom-btn"
  onClick={() => setModalShow(true)}
>
  <i className="bi bi-plus-lg fs-5" />
  Add
</button>

      </div>
      <UserTable/>

      <CommonModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Create User"
        size="xl"
        footer={false}
        fullscreen={"xl-down"}
      >
        <UserCreate 
         closeModal={()=>closeModal()}
        />
      </CommonModal>
  </div>

  );
}
