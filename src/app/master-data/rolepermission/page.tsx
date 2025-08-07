import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Role & Permission | Workforce Management",
};

export default function RolePermission() {
  return <div>
                <PageBreadcrumb root="Master Data" pageTitle="Role & Permission" />
         </div>;
}