"use client";

import { motion } from "framer-motion";
import { HandshakeIcon, Receipt, Settings, Upload } from "lucide-react";

const steps = [
  {
    label: "Step 1",
    title: "Upload your file",
    body: "Drop in your Excel or CSV of participants or vendors names, account details, amounts owed.",
    icon: (
      <Upload className="h-6 w-6 stroke-green" />
    ),
   
  },
  {
    label: "Step 2",
    title: "We verify each line",
    body: "Account names, numbers, and amounts are checked before anything moves, so bad data gets caught early.",
    icon: <Settings className="h-6 w-6 stroke-blue" />,
   
  },
  {
    label: "Step 3",
    title: "Payments go out",
    body: "Funds are disbursed to every recipient on the list  participants and vendors alike  in one coordinated run.",
    icon: <Receipt className="h-6 w-6 stroke-green" />,
    
  },
  {
    label: "Step 4",
    title: "Track it to settled",
    body: "You and your team watch each line move from queued to processing to settled, with proof for every kobo.",
    icon: 
     <HandshakeIcon className="h-6 w-6 stroke-green"/>,
 
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const card = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.92,
    filter: "blur(8px)",
  },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
    },
  },
};

const line = {
  hidden: { scaleX: 0 },
  show: {
    scaleX: 1,
    transition: {
      duration: 1.3,
      ease: "easeInOut",
    },
  },
};

export function HowItWorks() {
  return (
    <section id="how" className="py-24 bg-zinc-100">
      <div className="mx-auto max-w-[1180px] px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-[560px]"
        >
          <span className="mb-3 block font-mono text-xs uppercase tracking-[0.08em] text-green-deep">
            The process
          </span>

          <h2 className="mb-4 font-serif text-4xl font-semibold">
            From spreadsheet to settled, in four steps
          </h2>

          <p className="text-graphite leading-7">
            You already have the list — names, accounts and amounts.
            We turn it into payments you can account for.
          </p>
        </motion.div>

        <div className="relative">

          {/* animated progress line */}

          <motion.div
        
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            style={{ originX: 0 }}
            className="absolute left-0 top-10 hidden h-[2px] w-full bg-green-deep/40 lg:block"
          />

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="grid grid-cols-1 gap-6 lg:grid-cols-4"
          >
            {steps.map((step) => (
              <motion.div
                key={step.label}
            
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                  },
                }}
                className="group relative overflow-hidden rounded-2xl border border-hairline shadow-xl bg-white p-8"
              >
                {/* Glow */}

                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0"
                  whileHover={{ opacity: 1 }}
                />

                {/* Number */}

                <span className="mb-5 block font-mono text-xs tracking-widest text-graphite">
                  {step.label}
                </span>

                {/* Icon */}

                <motion.svg
                  viewBox="0 0 36 36"
                  fill="none"
                  className="mb-6 h-10 w-10"
                  initial="hidden"
                  whileInView="show"
                >
                  <motion.g
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{
                      duration: 1,
                      ease: "easeInOut",
                    }}
                  >
               
                    {step.icon}
                  </motion.g>
                </motion.svg>

                <h3 className="mb-3 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="text-sm leading-7 text-graphite">
                  {step.body}
                </p>

                {/* bottom accent */}

                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-green-deep"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.35 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}