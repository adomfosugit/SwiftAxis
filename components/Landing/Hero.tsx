"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

export function Hero() {
  return (
    <header className="relative overflow-hidden py-32 md:py-[140px] ">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero.jpg"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Overlay for text legibility over the photo — tune the alpha
           values if the image is lighter/darker than expected. */}
        <div className="absolute inset-0 bg-accent/50" />
      </div>

      <div className="mx-auto max-w-[720px] px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-[22px] flex items-center justify-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-green-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            Disbursement infrastructure for organizations
          </span>
          <h1 className="mb-6 font-serif text-[38px] font-semibold leading-[1.06] tracking-tight md:text-[52px]">
            Pay everyone on your list {" "}
            <em className="font-medium italic text-green-deep">
              without becoming a bank.
            </em>
          </h1>
          <p className="mx-auto mb-[34px] max-w-[480px] text-[17px] leading-[1.65] text-graphite">
            Swift Axis handles training allowances, per-diems, and third-party
            vendor payments on your behalf. Upload a spreadsheet, we move the
            money, you watch every line settle.
          </p>
       
        </motion.div>
      </div>
    </header>
  );
}