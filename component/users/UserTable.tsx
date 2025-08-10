import CommonModal from "@/common/modal/CommonModal";
import DynamicTable from "@/common/table/DataTable";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchMissions } from "@/redux/slices/missionSlice";
import { MissionTable } from "@/types/general-setup/mission.type";
import { getUtilityApiUrl } from "@/utils/api";
import { deleteApi } from "@/utils/deleteApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import MissionUpdate from "./UserUpdate";

export default function UserTable() {
  const missionUrl = getUtilityApiUrl("/missions");

  const dispatch = useAppDispatch();
  const { missions, loading, error } = useAppSelector((state) => state.mission);
  const [tableData, setTableData] = useState<MissionTable[]>([]);
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [itemUpdate,setItemUpdate] = useState<MissionTable>({
  id: 0,
  name: "",
  missionDescription: "",
  raisingDate: "",
  missionCountryId:"",
  startDate: "",
  endDate: "",
})

  useEffect(() => {
    dispatch(fetchMissions());
  }, [dispatch]);

  useEffect(() => {
    if (missions && missions.length > 0) {
      const transformed: MissionTable[] = missions.map((m, idx) => ({
        id: m.id,
        name: m.name,
        missionDescription: m.missionDescription,
        raisingDate: m.raisingDate,
        missionCountryId:m.missionCountryDto?.id,
        startDate: m.startDate,
        endDate: m.endDate,
      }));
      setTableData(transformed);
    }
  }, [missions]);

  const deleteItem = async (item: MissionTable) => {
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
      const res = await deleteApi(missionUrl, item.id);
      console.log("Deleted successfully:", res);
      toast.success("Mission deleted successfully.");
      dispatch(fetchMissions());
    } catch (error) {
      console.error("Failed to delete:", error);
      toast.error("Failed to delete mission.");
    }
  }
  };

  const updateItem= (item:MissionTable)=>{
    setModalShow(true)
    setItemUpdate(item)
  }
  const closeModal=()=>{
    setModalShow(false);
  }

  return (
    <div>
      <DynamicTable
        data={tableData}
        columns={[
          { label: "Mission Name", accessor: "name", sortable: true, searchable: true, align: "left" },
          { label: "Mission Description", accessor: "missionDescription", sortable: true, searchable: true, align: "left" },
          { label: "Raising Date", accessor: "raisingDate", sortable: true, searchable: true, align: "center" },
          { label: "Start Date", accessor: "startDate", sortable: true, searchable: true, align: "center" },
          { label: "End Date", accessor: "endDate", sortable: true, searchable: true, align: "center" },
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
        <MissionUpdate 
        itemUpdate={itemUpdate}
        closeModal={()=>closeModal()}
        />
      </CommonModal>
    </div>
  );
}
