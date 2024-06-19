import Image from "next/image";
import React from "react";

type Props = { size?: string };

export default function Logo({ size }: Props) {
  const fontSize = size ? size : "text-3xl";
  return (
    <div className="flex items-center justify-center">
      <Image src={"/formlogo.svg"} width={60} height={60} alt="logo icon" />
      <h1 className={`text-primary text-xl md:${fontSize}  font-bold italic`}>
        Namazeg
      </h1>
    </div>
  );
}
