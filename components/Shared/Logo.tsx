import Link from "next/link";
import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5 font-serif text-[19px] font-semibold tracking-tight"
    >
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="4" fill="#0B1F33" />
        <path
          d="M9 20L15 11L19 17L23 12"
          stroke="#5FCBA3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="12" r="2" fill="#5FCBA3" />
      </svg>
      Swift Axis
    </Link>
  );
};

export default Logo;
