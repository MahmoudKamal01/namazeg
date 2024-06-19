import Image from "next/image";
import React from "react";
type Props = {
  header: string;
  paragraph: string;
  gifUrl: string;
  bgColor?: string;
  flowDirection?: string;
};

export default function Feature({
  header,
  paragraph,
  gifUrl,
  bgColor,
  flowDirection,
}: Props) {
  return (
    <div
      className={`flex items-center ${
        bgColor ? bgColor : "bg-indigo-50"
      } h-full rounded-lg flex-col ${
        flowDirection === "reverse" ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="flex-1 p-4">
        <h1 className="font-extrabold text-l md:text-3xl text-gray-600">
          {header}
        </h1>
        <p className="pt-12 text-l md:text-3xl md:text-justify">{paragraph}</p>
      </div>
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="relative w-full">
          <Image src={gifUrl} alt="form gif" width={1024} height={1024} />
        </div>
      </div>
    </div>
  );
}
