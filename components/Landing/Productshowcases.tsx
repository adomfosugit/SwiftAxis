"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const fadeUpDelayed = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] } },
};

export function ProductShowcase() {
  return (
    <section id="product" className="border-y border-hairline-soft bg-paper-dim py-20 md:py-[88px]">
      <div className="mx-auto max-w-[1180px] px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="mb-14 max-w-[560px]"
        >
          <span className="mb-3.5 block font-mono text-xs uppercase tracking-[0.08em] text-green-deep">The platform</span>
          <h2 className="mb-3.5 font-serif text-[30px] font-semibold leading-[1.15] tracking-tight md:text-[36px]">
            Built around the two things you actually do
          </h2>
          <p className="text-base leading-[1.65] text-graphite">
            Submit a request. Check on a request. Everything else is plumbing we handle so you don&apos;t have to.
          </p>
        </motion.div>

        {/* Submitting a request */}
        <div className="mb-20 grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-[60px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          >
            <span className="mb-4 block font-mono text-[11.5px] uppercase tracking-[0.05em] text-green-deep">Submitting a request</span>
            <h3 className="mb-4 font-serif text-2xl font-semibold leading-tight md:text-[28px]">Upload the file you already have</h3>
            <p className="mb-[22px] text-[15.5px] leading-[1.7] text-graphite">
              No new format to learn. Bring your existing spreadsheet of participants or vendors  Swift Axis reads it, maps the fields, and flags anything that looks off before it ever reaches a payment rail.
            </p>
            <ul className="text-[14.5px] text-ink-soft">
              {[
                "Accepts Excel and CSV files directly",
                "Supports both participant allowances and vendor invoices in one workflow",
                "Confirms receipt instantly with a batch reference number",
              ].map((item, i) => (
                <li key={item} className={`flex items-start gap-3 py-2.5 ${i > 0 ? "border-t border-hairline-soft" : ""}`}>
                  <span className="mt-2 h-[5px] w-[5px] shrink-0 rounded-full bg-green" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            
        
          >
            <div className="overflow-hidden rounded-lg border border-hairline bg-white">
              <div className="flex items-center gap-2 border-b border-hairline-soft px-5 py-4">
                <span className="h-2 w-2 rounded-full bg-hairline" />
                <span className="h-2 w-2 rounded-full bg-hairline" />
                <span className="h-2 w-2 rounded-full bg-hairline" />
                <span className="ml-1 font-mono text-[11.5px] text-graphite">New payment request</span>
              </div>
              <div className="m-6 rounded-md border-[1.5px] border-dashed border-hairline bg-paper-dim px-5 py-9 text-center">
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none" className="mx-auto mb-3.5">
                  <path d="M17 22V9M17 9L12 14M17 9L22 14" stroke="#1A7F5A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 24V26C7 27.1 7.9 28 9 28H25C26.1 28 27 27.1 27 26V24" stroke="#0B1F33" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <div className="mb-1.5 text-[14.5px] font-semibold text-ink">Drop your payment file here</div>
                <div className="text-[12.5px] text-graphite">.xlsx or .csv  participant allowances or vendor invoices</div>
              </div>
              <div className="mx-6 mb-6 flex items-center gap-3 rounded-md bg-paper-dim px-3.5 py-3">
                <div className="flex-1 text-[13px] font-medium">
                  july_training_allowances.xlsx
                  <span className="mt-0.5 block font-mono text-[10.5px] font-normal text-graphite">128 rows · validated · ready to submit</span>
                </div>
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5L4.2 7.7L9 3" stroke="#FAFAF7" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tracking a request */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-[60px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            
            className="lg:order-2"
          >
            <span className="mb-4 block font-mono text-[11.5px] uppercase tracking-[0.05em] text-green-deep">Tracking a request</span>
            <h3 className="mb-4 font-serif text-2xl font-semibold leading-tight md:text-[28px]">Know exactly where every payment stands</h3>
            <p className="mb-[22px] text-[15.5px] leading-[1.7] text-graphite">
              The moment a batch is submitted, it shows up on both your dashboard and ours same statuses, same numbers, no back-and-forth emails asking &ldquo;did this go through yet?&rdquo;
            </p>
            <ul className="text-[14.5px] text-ink-soft">
              {[
                "Status moves through queued, processing, settled, or flagged",
                "Filter by batch, recipient, date, or status",
                "Download a settlement report once a batch completes",
                "Get notified the moment a flagged payment needs your input",
              ].map((item, i) => (
                <li key={item} className={`flex items-start gap-3 py-2.5 ${i > 0 ? "border-t border-hairline-soft" : ""}`}>
                  <span className="mt-2 h-[5px] w-[5px] shrink-0 rounded-full bg-green" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            className="lg:order-1"
          >
            <div className="overflow-hidden rounded-lg border border-hairline bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-hairline-soft px-[22px] py-[18px]">
                <span className="text-sm font-semibold">Your Portal</span>
                <span className="font-mono text-[11px] text-graphite">Uploads</span>
              </div>
              {[
                { name: "Spring Charity Ltd", id: "REF-88291.xlsx", amt: "₦45,000", pill: "settled", label: "Settled" },
                { name: "Greenfield Logistics Ltd", id: "REF-88294.xlsx", amt: "₦820,000", pill: "processing", label: "Processing" },
                { name: "Bayo Adekunle", id: "REF-88297.xlsx", amt: "₦45,000", pill: "flagged", label: "Flagged" },
                { name: "Ngozi Folarin", id: "REF-88301.xlsx", amt: "₦45,000", pill: "queued", label: "Queued" },
              ].map((row) => (
                <div key={row.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 border-b border-hairline-soft px-[22px] py-[15px] last:border-none">
                  <div>
                    <div className="text-[13.5px] font-medium">{row.name}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-graphite">{row.id}</div>
                  </div>
                  <div className="font-mono text-[13px] text-ink-soft">{row.amt}</div>
                  <span
                    className={`whitespace-nowrap rounded-full px-[11px] py-[5px] font-mono text-[10.5px] uppercase tracking-[0.02em] ${
                      row.pill === "settled"
                        ? "bg-[#E1F0E8] text-green-deep"
                        : row.pill === "processing"
                        ? "bg-[#E3EEFB] text-[#1D5A9C]"
                        : row.pill === "queued"
                        ? "bg-[#FBF0DD] text-amber"
                        : "bg-[#F8E3E3] text-red"
                    }`}
                  >
                    {row.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}