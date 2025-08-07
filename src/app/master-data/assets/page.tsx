import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assets | Workforce Management",
};

export default function Assets() {
  return <div>
            <PageBreadcrumb root="Master Data" pageTitle="Assets" />
         </div>;
}