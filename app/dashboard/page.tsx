import { Button } from "@/components/ui/button";
import React from "react";
import CreateForm from "./_components/CreateForm";

type Props = {};

export default function page({}: Props) {
  return (
    <div className="p-10 min-h-screen">
      <h2 className="font-bold text-3xl flex items-center justify-center">
        <CreateForm />
      </h2>
    </div>
  );
}
