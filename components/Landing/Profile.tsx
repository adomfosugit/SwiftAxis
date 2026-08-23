"use client";

import { useState } from "react";
import Image from "next/image";
import { TeamMember } from "@/constants/Team";



interface ProfileCardProps {
  member: TeamMember;
}

export function ProfileCard({ member }: ProfileCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-navy-900/10 bg-paper-50 shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-navy-900/5">
        <Image
          src={member.imageUrl}
          alt={member.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 320px"
        />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-serif text-lg font-semibold text-navy-900">
          {member.name}
        </h3>
        <p className="text-sm font-medium text-navy-900/60">{member.role}</p>

        <p
          className={`mt-1 text-sm leading-relaxed text-navy-900/80 ${
            expanded ? "" : "line-clamp-3"
          }`}
        >
          {member.description}
        </p>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-2 self-start text-sm font-medium text-emerald-700 underline-offset-2 hover:underline"
          aria-expanded={expanded}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      </div>
    </div>
  );
}

interface ProfileGridProps {
  members: TeamMember[];
}

export function ProfileGrid({ members }: ProfileGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member) => (
        <ProfileCard key={member.name} member={member} />
      ))}
    </div>
  );
}