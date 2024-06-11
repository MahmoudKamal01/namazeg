"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { clsx } from "clsx";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

export default function SideNav({}: Props) {
  const navList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, [path]);

  return (
    <>
      <div className="min-h-screen shadow-md border hidden md:block">
        <div className="p-5">
          {navList.map((menu, index) => (
            <h2
              key={index}
              className={`flex hover:text-white hover:bg-primary rounded-lg hover:cursor-pointer items-center p-5 mb-3 gap-3 ${
                path === menu.path
                  ? "bg-primary text-white font-bold"
                  : "text-gray-500"
              }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          ))}
        </div>
        <div className="bottom-20 p-6 w-64">
          <Button className="w-full">+ Create Form</Button>
          <div className="my-7">
            <Progress value={33} />
            <h2 className="text-sm mt-2 text-gray-600">
              <strong>2 </strong>out of <strong>3</strong> files created
            </h2>
            <h2 className="text-[10px] mt-2 text-gray-600">
              Upgrade your plan for unlimited AI forms
            </h2>
          </div>
        </div>
      </div>

      {/* Bottom Navbar for Mobile View */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md flex justify-around py-2">
        {navList.map((menu, index) => (
          <button
            key={index}
            className={`flex flex-col items-center ${
              path === menu.path ? "text-primary" : "text-gray-500"
            }`}
            onClick={() => {
              // Add navigation logic here, e.g., use a router or window.location.href
              window.location.href = menu.path;
            }}
          >
            <menu.icon className="w-6 h-6" />
            <span className="text-xs">{menu.name}</span>
          </button>
        ))}
      </div>
    </>
  );
}
