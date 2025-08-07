import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menus | Workforce Management",
};

export default function Menus() {
  return <div>
              <PageBreadcrumb root="Master Data" pageTitle="Menus" />
         </div>;
}