'use client'
import CountUp from "../CountUp";

const items = [
  { num: 128, suffix: "+", label: "line batches we handle without breaking a sweat" },
  { num: 24, suffix: "hr", label: "turnaround on requests submitted before cutoff" },
  { num: 100, suffix: "%", label: "of payments traceable to a status, in real time" },
  { num: 2, suffix: "", label: "payment types: participant allowances & vendor payouts" },
];

export function TrustStrip() {
  return (
    <div className="border-y border-hairline-soft bg-cardprimary py-16">
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-5 px-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((i) => (
          <div
            key={i.label}
            className="flex flex-col gap-2 rounded-lg border border-white/15 bg-white/5 p-6"
          >
            <span className="flex items-baseline font-serif text-[32px] font-semibold text-white">
              <CountUp
                from={0}
                to={i.num}
                separator=","
                direction="up"
                duration={1.5}
                delay={0}
                className="count-up-text"
              />
              {i.suffix && <span className="ml-0.5 text-[18px]">{i.suffix}</span>}
            </span>
            <p className="text-[13.5px] leading-[1.5] text-white/60">{i.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}