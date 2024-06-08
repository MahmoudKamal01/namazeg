"use client";
import LogoIcon from "@/app/_components/LogoIcon";
import { SignIn, useSignIn } from "@clerk/nextjs";
import Image from "next/image";
import { Suspense } from "react";

export default function Page() {
  const { isLoaded } = useSignIn();

  return (
    <section className="bg-white font-extrabold">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-center  lg:col-span-5 lg:h-full xl:col-span-6">
          <Image
            alt="sign-in background"
            src="/pattern.jpg"
            className="absolute inset-0 h-full w-full"
            height={1024}
            width={1024}
          />
          {/* <div className="absolute inset-0 bg-white transition-opacity duration-300 opacity-50 hover:opacity-40" /> */}
          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <LogoIcon height={100} width={100} color="white" />
            </a>
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome to{" "}
              <span className="italic font-bold">Namazeg: AI form builder</span>
            </h2>
            <div className="mt-4 leading-relaxed text-white italic text-2xl">
              <p>Namazeg empowers you to build intelligent forms with ease.</p>
              <p> Sign in to unlock the future of form building.</p>{" "}
            </div>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
                href="#"
              >
                <span className="sr-only">Home</span>
                <LogoIcon height={100} width={100} color="white" />
              </a>

              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Namazeg AI form builder
              </h1>

              <div className="mt-4 leading-relaxed text-gray-500">
                <p>
                  Namazeg empowers you to build intelligent forms with ease.
                </p>
                <p> Sign in to unlock the future of form building.</p>{" "}
              </div>
            </div>

            {isLoaded ? (
              <SignIn path="/sign-in" />
            ) : (
              <div className="space-y-4 w-96 h-96 ">
                <div className="w-full h-full rounded-lg bg-gray-200 animate-pulse"></div>
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
}
