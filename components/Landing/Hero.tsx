"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/button";


const rows = [
  { idx: "01", name: "Amara Obi", sub: "training allowance · 3 days", amt: "₦45,000", status: "settled", label: "Settled" },
  { idx: "02", name: "Tunde Bakare", sub: "training allowance · 3 days", amt: "₦45,000", status: "settled", label: "Settled" },
  { idx: "03", name: "Chidera Eze", sub: "training allowance · 3 days", amt: "₦45,000", status: "processing", label: "Processing" },
  { idx: "04", name: "Greenfield Logistics Ltd", sub: "vendor payment · venue hire", amt: "₦820,000", status: "processing", label: "Processing" },
  { idx: "05", name: "Ngozi Folarin", sub: "training allowance · 3 days", amt: "₦45,000", status: "queued", label: "Queued" },
];

const statusStyle: Record<string, string> = {
  settled: "bg-[rgba(26,127,90,0.22)] text-[#5FCBA3]",
  processing: "bg-[rgba(55,138,221,0.18)] text-[#7FB4EE]",
  queued: "bg-[rgba(176,121,28,0.18)] text-[#E8B85C]",
};

export function Hero() {
  return (
    <header className="relative overflow-hidden py-24 md:py-[96px] bg-accent">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-16 px-8 lg:grid-cols-2 ">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-[22px] flex items-center gap-2.5 font-mono text-[12.5px] uppercase tracking-[0.08em] text-green-deep">
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            Disbursement infrastructure for organizations
          </span>
          <h1 className="mb-6 font-serif text-[38px] font-semibold leading-[1.06] tracking-tight md:text-[52px]">
            Pay everyone on your list — <em className="font-medium not-italic text-green-deep italic">without becoming a bank.</em>
          </h1>
          <p className="mb-[34px] max-w-[480px] text-[17px] leading-[1.65] text-graphite">
            Swift Axis handles training allowances, per-diems, and third-party vendor payments on your behalf. Upload a spreadsheet, we move the money, you watch every line settle.
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#contact"
              className="inline-flex items-center gap-2 rounded-[3px] bg-ink px-[26px] py-3.5 text-[15px] font-medium text-paper transition-colors hover:bg-green-deep"
            >
           
              <Button className="bg-cardprimary text-white hover:bg-cardprimary/80 p-5">Request a demo</Button>

            </motion.a>
           <Button className="ring-1 ring-cardprimary  hover:bg-cardprimary/80 p-5" variant="outline">See how it works</Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="overflow-hidden rounded-md bg-ink shadow-[0_24px_60px_-20px_rgba(11,31,51,0.35)]"
        >
            {/* card fix */}
          <div className="bg-cardprimary flex items-center justify-between px-[22px] py-[18px]">
            <span className="font-mono text-xs tracking-wide text-zinc-300">disbursement_batch.xlsx</span>
            <span className="font-mono text-[11.5px] text-zinc-300">BATCH-3392</span>
          </div>
          <div className="py-1.5">
            {rows.map((r, i) => (
              <motion.div
                key={r.idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.12 }}
                className="bg-cardprimary grid grid-cols-[24px_1fr_auto_92px] items-center  px-[22px] py-[13px] last:border-none sm:grid-cols-[28px_1fr_100px_96px]"
              >
                <span className="font-mono text-[11px] text-slate-100">{r.idx}</span>
                <span className="text-[13.5px] text-slate-500">
                  {r.name}
                  <span className="mt-0.5 block font-mono text-[10.5px] text-blue-500">{r.sub}</span>
                </span>
                <span className="hidden text-right font-mono text-[13px] text-green-600 sm:block">{r.amt}</span>
                <span className={`rounded-full px-[9px] py-1 text-center font-mono text-[10.5px] uppercase tracking-[0.03em] ${statusStyle[r.status]}`}>
                  {r.label}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-black bg-cardprimary px-[22px] py-4">
            <span className="font-mono text-[11.5px] text-white/45">128 recipients · ₦6,140,000 total</span>
            <span className="font-mono text-[14.5px] font-medium text-[#5FCBA3]">76 settled</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
