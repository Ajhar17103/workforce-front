import type { Metadata } from "next";
import React from "react";


export const metadata: Metadata = {
  title:
    "Workforce Management",
  description: "",
};

export default function users() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
     <h1>Hello!</h1>
    </div>
  );
}
