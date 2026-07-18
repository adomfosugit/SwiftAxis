"use client";

import { motion } from "framer-motion";

const cases = [
  {
    title: "Training & event allowances",
    body: "Pay participant stipends, per-diems, and transport allowances across a full cohort, in one batch, with no manual transfers.",
    icon: (
      <>
        <circle cx="16" cy="11" r="5" stroke="#0B1F33" strokeWidth="1.6" />
        <path d="M6 27C6 21.5 10.5 18 16 18C21.5 18 26 21.5 26 27" stroke="#1A7F5A" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "Vendor & supplier payments",
    body: "Settle invoices for venues, caterers, logistics partners, and other vendors on behalf of your organization or clients.",
    icon: (
      <>
        <rect x="5" y="9" width="22" height="16" rx="2" stroke="#0B1F33" strokeWidth="1.6" />
        <path d="M5 14H27" stroke="#1A7F5A" strokeWidth="1.6" />
      </>
    ),
  },
  {
    title: "Multi-client disbursement",
    body: "Agencies and program managers running payments for several clients at once, each with its own batch and audit trail.",
    icon: (
      <>
        <path d="M6 22L13 15L18 19L26 10" stroke="#1A7F5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M6 26H26" stroke="#0B1F33" strokeWidth="1.6" strokeLinecap="round" />
      </>
    ),
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function UseCases() {
  return (
    <section id="usecases" className="py-20 md:py-[88px] bg-zinc-200">
      <div className="mx-auto max-w-[1180px] px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        
          className="mb-14 max-w-[560px]"
        >
          <span className="mb-3.5 block font-mono text-xs uppercase tracking-[0.08em] text-green-deep">Who it&apos;s for</span>
          <h2 className="mb-3.5 font-serif text-[30px] font-semibold leading-[1.15] tracking-tight md:text-[36px]">
            If you&apos;re paying a list of people or vendors, this is for you
          </h2>
          <p className="text-base leading-[1.65] text-graphite">
            Built for the organizations that run trainings, manage programs, and coordinate vendors not for any one industry.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          variants={stagger}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cases.map((c) => (
            <motion.div
              key={c.title}
        
              className="rounded-md border border-hairline p-8"
            >
              <svg className="mb-5 h-8 w-8" viewBox="0 0 32 32" fill="none">
                {c.icon}
              </svg>
              <h3 className="mb-2 text-[16px] font-semibold">{c.title}</h3>
              <p className="text-[14px] leading-[1.65] text-graphite">{c.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}