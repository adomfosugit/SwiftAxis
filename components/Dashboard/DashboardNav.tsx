import React from "react";

import { NavigationLinks } from "@/constants";
import Link from "next/link";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import Logo from "../Shared/Logo";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="sticky top-0 z-50 border-b border-hairline-soft bg-background backdrop-blur-md">
      <div className="mx-auto flex w-full items-center justify-between px-8 py-4.5">
        <Logo />

        <div className="">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
