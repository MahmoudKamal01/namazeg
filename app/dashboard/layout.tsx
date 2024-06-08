"use client";
import { SignedIn } from "@clerk/nextjs";
import React from "react";
import SideNav from "./_components/SideNav";
import * as dotenv from "dotenv";
dotenv.config();
type Props = { children: React.ReactNode };

export default function DashboardLayout({ children }: Props) {
  return (
    <SignedIn>
      <div className="h-full">
        <div className="h-full md:w-64 fixed">
          <SideNav />
        </div>
        <div className="md:ml-64">{children}</div>
      </div>
    </SignedIn>
  );
}
