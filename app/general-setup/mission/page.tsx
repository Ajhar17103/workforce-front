'use client';

import MissionCreate from "./MissionCreate";
import MissonTable from "./MissonTable";

export default function Mission() {
  
  return (
    <div className="g-5">
      <MissionCreate />
      <MissonTable />
    </div>
  );
}
