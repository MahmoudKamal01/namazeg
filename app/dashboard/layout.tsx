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
      <div className="flex">
        <div className=" md:w-64 ">
          <SideNav />
        </div>
        <div className="w-full">{children}</div>
      </div>
    </SignedIn>
  );
}
