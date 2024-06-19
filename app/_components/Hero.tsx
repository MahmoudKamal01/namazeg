
'use client'
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

type Props = {};

export default function Hero({}: Props) {
  const { isSignedIn } = useUser();

  return (
    <section className="h-screen flex items-center justify-center ">
      <div className="mx-auto max-w-screen-xl px-4 py-32 ">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Create your form
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              in seconds not in hours.{" "}
            </strong>
          </h1>

          <div className="mt-4 text-xl ">
            Unlock Your Productivity With{" "}
            <span className="font-bold block md:inline">
              Namazeg - AI Form Builder!
            </span>
            <p>Where Innovation Meets Functionality!</p>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary-lighter focus:outline-none focus:ring active:bg-primary/60 sm:w-auto"
              href={isSignedIn?"/dashboard":"/sign-in"}
            >
              Get Started
            </Link>

            <Link
              className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-primary-lighter focus:outline-none focus:ring active:text-primary sm:w-auto"
              href="#features"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
