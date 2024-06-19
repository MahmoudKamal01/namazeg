import React from "react";
import LogoIcon from "../_components/LogoIcon";

type Props = {};

export default function loading({}: Props) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="animate-ping">
        <LogoIcon width={250} height={250} />
      </div>
    </div>
  );
}
