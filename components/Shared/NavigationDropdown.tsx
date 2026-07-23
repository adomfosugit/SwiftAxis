'use client'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavigationLinks } from "@/constants";
import { UserButton } from "@clerk/nextjs";
import { Show, SignInButton } from "@clerk/react";
import { Menu, User } from "lucide-react";
import Link from "next/link";

type Props = {};

const NavigationDropdown = (props: Props) => {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="p-5"
          render={<Button variant="outline" />}
        >
          <Menu />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 text-center shadow-xs"
          align="center"
          sideOffset={15}
        >
          <DropdownMenuGroup>
            <DropdownMenuLabel> Swift Axis</DropdownMenuLabel>
            {NavigationLinks.map((i) => (
              <DropdownMenuItem className="text-center" key={i.href}>
                <Link href={i.href}>{i.label}</Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
         
          <Show when="signed-in">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link className="text-center" href="/dashboard">
                <DropdownMenuItem className="text-center">
                  Dashboard
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </Show> 
           <Show when="signed-in">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-center">
                <UserButton showName  />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </Show>
          <Show when="signed-out">
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-center">
                <SignInButton>Sign In</SignInButton>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </Show>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavigationDropdown;
