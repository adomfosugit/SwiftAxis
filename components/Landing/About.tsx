"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "../ScrollStack";

const rows = [
  {
    num: "01",
    title: "Participant & allowance disbursement",
    body: "Pay stipends and allowances to entire cohorts in one batch, not one transfer at a time.",
    bg: "bg-sky-900",
    text: "text-white",
  },
  {
    num: "02",
    title: "Third-party vendor payments",
    body: "We settle vendor invoices directly, so your team isn't chasing every transfer.",
    bg: "bg-green-700",
    text: "text-white",
  },
  {
    num: "03",
    title: "Bulk payment processing",
    body: "One spreadsheet in, one payment run out from a handful of recipients to several hundred.",
    bg: "bg-zinc-800",
    text: "text-white",
  },
  {
    num: "04",
    title: "Status tracking & reconciliation",
    body: 'Every payment gets a reference and a live status, so "did this go through" always has an answer.',
    bg: "bg-zinc-600",
    text: "text-white",
  },
];
export function About() {
  const [stackComplete, setStackComplete] = useState(false);

  return (
    <section
      id="about"
      className="border-y border-hairline-soft bg-paper-dim py-20 md:py-[80px] bg-white"
    >
      <div className="max-w-[1180px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-3 items-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          <span className="mb-3.5 block font-mono text-xs uppercase tracking-[0.08em] text-green-deep">
            About us
          </span>
          <h2 className="mb-5 font-serif text-[28px] font-semibold leading-[1.15] tracking-tight md:text-[32px]">
            A payments desk for organizations that pay people in bulk
          </h2>
          <p className="mb-5 font-serif text-[17px] font-medium leading-[1.6] text-ink-soft">
            Swift Axis Integrated Services Limited is a Nigerian-based payment
            processing company built for one specific job: getting money from an
            organization to a long list of people or vendors, accurately and on
            record.
          </p>
          <p className="mb-4 text-[15px] leading-[1.75] text-graphite">
            We started after watching the same problem play out across training
            programs, NGOs, and agencies — someone in finance stuck manually
            transferring allowances to forty participants one at a time, or
            chasing five different vendor invoices through five different bank
            apps.
          </p>
          <p className="text-[15px] leading-[1.75] text-graphite">
            Swift Axis exists to take that work off your desk. You send us a
            list and we handle the disbursement end to end: validating account
            details, processing the payments, and keeping a live, traceable
            status on every single line until it settles.
          </p>
        </motion.div>

        <div
  className="flex flex-col gap-6 bg-[url('/SwiftAxis.png')] bg-cover bg-center rounded-2xl p-6"
>
  <div className="h-[450px] w-[700px]">
    <ScrollStack
      itemDistance={15}
      itemStackDistance={10}
      baseScale={0.6}
      className="no-scrollbar"
      onStackComplete={() => {}}
    >
      {rows.map((r) => (
        <ScrollStackItem
          key={r.num}
          itemClassName={`${r.bg} text-paper rounded-md shadow-[0_24px_60px_-20px_rgba(11,31,51,0.35)]`}
        >
          <div className="flex flex-col gap-4 p-2 md:p-2">
            <span className="font-mono text-xs text-white">{r.num}</span>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-white">
              {r.title}
            </h3>
            <p className={`text-xl leading-[1.7] ${r.text} max-w-xl`}>
              {r.body}
            </p>
          </div>
        </ScrollStackItem>
      ))}
    </ScrollStack>
  </div>
</div>
      </div>
    </section>
  );
}
