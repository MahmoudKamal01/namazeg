import React from "react";

type Props = {};

export default function Hero({}: Props) {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-start">
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
              <a
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary-lighter focus:outline-none focus:ring active:bg-primary/60 sm:w-auto"
                href="#"
              >
                Get Started
              </a>

              <a
                className="block w-full rounded px-12 py-3 text-sm font-medium text-primary shadow hover:text-primary-lighter focus:outline-none focus:ring active:text-primary sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
