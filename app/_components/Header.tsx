"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import Logo from "./Logo";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {};

function Header({}: Props) {
  const { user, isSignedIn, isLoaded } = useUser();
  const path = usePathname();
  useEffect(() => {
    console.log(path);
  }, []);

  return (
    !path.includes("aiform") && (
      <div className="p-3 border-b shadow-sm">
        <div className="flex items-center justify-between md:px-32">
          <Link href="/">
            <Logo />
          </Link>
          {!isLoaded ? (
            <Button>Get Started</Button>
          ) : isSignedIn ? (
            <div className="flex items-center gap-5">
              <Link href={"/dashboard"}>
                <Button variant="outline">Dashboard</Button>
              </Link>
              <UserButton />
            </div>
          ) : (
            <SignInButton>
              <Button>Get Started</Button>
            </SignInButton>
          )}
        </div>
      </div>
    )
  );
}

export default Header;
