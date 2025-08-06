import CommonModal from "@/components/modal/CommonModal";
import DynamicTable from "@/components/table/DataTable";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { AllowanceTable } from "@/types/sailor-basic/allowance.type";
import { getUtilityApiUrl } from "@/utils/api";
import { deleteApi } from "@/utils/deleteApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import AllowanceUpdate from "./AllowanceUpdate";
import { fetchAllowances } from "@/redux/slices/allowanceSlice";

export default function AllowanceTablePage() {
  const apiUrl = getUtilityApiUrl("/allowances");

  const dispatch = useAppDispatch();
  const { allowances, loading, error } = useAppSelector((state) => state.allowance);
  const [tableData, setTableData] = useState<AllowanceTable[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate,setItemUpdate] = useState<AllowanceTable>({
  id: 0,
  name: "",
  payStatus: 'PAY',
  applyFor: 'OFFICER',
  calculationMode: 'FIXED' ,
  actionStatus: 'ADDITION',
  duration: 'DAILY',
  jsiDuration: 'DAILY',
  payBasedOn: 'BASIC',
  processType: 'COMPULSORY',
  noProcessCurrentMonth: true,
  treatReceivable: true,
  notAllowedPension: true,
  payAllowanceDetail: "",
  budgetCode: "",
})

  useEffect(() => {
 dispatch(fetchAllowances());
  }, [dispatch]);

  useEffect(() => {
    if (allowances && allowances.length > 0) {
      const transformed: AllowanceTable[] = allowances.map((a, idx) => ({
        id: a.id,
        name: a.name,
    payStatus: a.payStatus,
  applyFor: a.applyFor,
  calculationMode: a.calculationMode ,
  actionStatus: a.actionStatus,
  duration: a.duration,
  jsiDuration: a.jsiDuration,
  payBasedOn: a.payBasedOn,
  processType:a.processType,
  noProcessCurrentMonth: a.noProcessCurrentMonth,
  treatReceivable: a.treatReceivable,
  notAllowedPension: a.notAllowedPension,
  payAllowanceDetail: a.payAllowanceDetail,
  budgetCode: a.budgetCode,
      }));
      setTableData(transformed);
    }
  }, [allowances]);

  const deleteItem = async (item: AllowanceTable) => {
  if (!item?.id) return;

  const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
  });

  if (result.isConfirmed) {
    try {
      const res = await deleteApi(apiUrl, item.id);
      console.log("Deleted successfully:", res);
      toast.success("Allowance deleted successfully.");
      dispatch(fetchAllowances());
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete allowance.");
    }
  }
  };

  const updateItem= (item:AllowanceTable)=>{
    setModalShow(true)
    setItemUpdate(item)
  }
  const closeModal=()=>{
    setModalShow(false);
  }

  return (
    <div className="card p-3">
      <h5 className="">Mission List</h5>
      <DynamicTable
        data={tableData}
        columns={[
          { label: "Mission Name", accessor: "name", sortable: true, searchable: true, align: "left" },
          { label: "Pay Status", accessor: "payStatus", sortable: true, searchable: true, align: "center" },
          { label: "Apply For", accessor: "applyFor", sortable: true, searchable: true, align: "center" },
        ]}
        onView={(row) => alert("viewd")}
        onEdit={(row) => updateItem(row)}
        onDelete={(row) => deleteItem(row)}
      />
      <CommonModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Mission Update"
        size="xl"
        footer={false}
        fullscreen={"xl-down"}
      >
        <AllowanceUpdate
        itemUpdate={itemUpdate}
        closeModal={()=>closeModal()}
        />
      </CommonModal>
    </div>
  );
}
