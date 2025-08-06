'use client';

import MissionCreate from "./MissionCreate";
import MissionTablePage from "./MissonTable";

export default function Mission() {
  
  return (
    <div className="g-5">
      <MissionCreate />
      <MissionTablePage />
    </div>
  );
}
