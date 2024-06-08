import Image from "next/image";
import React from "react";

type Props = { size?: string };

export default function Logo({ size }: Props) {
  return (
    <div className="flex items-center justify-center">
      <Image src={"/logo.svg"} width={60} height={60} alt="logo icon" />
      <h1
        className={`text-primary  ${size ? size : "text-3xl"} font-bold italic`}
      >
        Namazeg
      </h1>
    </div>
  );
}
