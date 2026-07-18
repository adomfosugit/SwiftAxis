import React from "react";
import Logo from "./Logo";
import { NavigationLinks } from "@/constants";
import Link from "next/link";
import {  Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

import { GlassButton } from "../ui/glassybutton";
import NavigationDropdown from "./NavigationDropdown";
import { Button } from "../ui/button";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="sticky top-0 z-50 border-b border-hairline-soft bg-background backdrop-blur-md">
      <div className="mx-auto flex w-full items-center justify-between px-8 py-4.5">
        <Logo />

        <div className="hidden items-center gap-9 md:flex">
          {NavigationLinks.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className="text-[14.5px] text-ink-soft transition-colors hover:text-green-deep"
            >
              {i.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Show when= 'signed-out'>
          <SignInButton >

            <Button   className="ring-1 bg-cardprimary shadow-xl w-full text-white backdrop-blur-xl rounded-xs p-4" > Sign In </Button>
          </SignInButton>
          </Show>
          
          <Show when= 'signed-in'>
            <Link
              href="/dashboard"
              className="text-[14px] font-medium text-ink-soft hover:text-green-deep"
            >
              Dashboard
            </Link>
            <UserButton />
          </Show>


       
        </div>

        <div className="flex items-center gap-4 md:hidden">

            <NavigationDropdown />
        </div>


      </div>
    </nav>
  );
};

export default Navbar;
