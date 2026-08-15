import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline-soft py-14 bg-cardprimary text-white">
      <div className="mx-auto max-w-[1180px] px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#" className="mb-4 flex items-center gap-2.5 font-serif text-[19px] font-semibold">
              <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="4" fill="#0B1F33" />
                <path d="M9 20L15 11L19 17L23 12" stroke="#5FCBA3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="23" cy="12" r="2" fill="#5FCBA3" />
              </svg>
              Swift Axis
            </a>
            <p className="mb-5 max-w-xs text-[13.5px] leading-[1.65] text-graphite">
              Swift Axis Integrated Services Limited handles disbursements and vendor payments for organizations running trainings, programs, and events.
            </p>
            {/* <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline text-graphite transition-colors hover:border-green-deep hover:text-green-deep"
                >
                  <Icon size={15} strokeWidth={1.8} />
                </a>
              ))}
            </div> */}
          </div>

          <div>
            <h5 className="mb-3.5 text-[13px] font-semibold">Platform</h5>
            <div className="flex flex-col gap-2.5 text-[13.5px] text-graphite">
              <a href="#how" className="hover:text-green-deep">How it works</a>
              <a href="#product" className="hover:text-green-deep">Upload &amp; tracking</a>
              <a href="/dashboard" className="hover:text-green-deep">Client portal</a>
            </div>
          </div>

          <div>
            <h5 className="mb-3.5 text-[13px] font-semibold">Company</h5>
            <div className="flex flex-col gap-2.5 text-[13.5px] text-graphite">
              <a href="#usecases" className="hover:text-green-deep">Who it&apos;s for</a>
              <a href="#security" className="hover:text-green-deep">Security</a>
              <a href="#contact" className="hover:text-green-deep">Contact</a>
            </div>
          </div>

          <div>
            <h5 className="mb-3.5 text-[13px] font-semibold">Contact</h5>
            <div className="flex flex-col gap-3 text-[13.5px] text-graphite">
              <a href="mailto:hello@swiftaxis.com" className="flex items-center gap-2 hover:text-green-deep">
                <Mail size={14} strokeWidth={1.8} className="shrink-0 text-green-deep" />
                info@swiftaxisintegratedservices.com
              </a>
              <a href="tel:+2341234567890" className="flex items-center gap-2 hover:text-green-deep">
                <Phone size={14} strokeWidth={1.8} className="shrink-0 text-green-deep" />
                07035736708
              </a>
              <div className="flex items-start gap-2">
                <MapPin size={14} strokeWidth={1.8} className="mt-0.5 shrink-0 text-green-deep" />
                <span>Abuja, Nigeria</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-2 border-t border-hairline-soft pt-6 text-[12.5px] text-graphite">
          <span>&copy; {currentYear} Swift Axis Integrated Services Limited.</span>
          <span>Abuja, Nigeria</span>
        </div>
      </div>
    </footer>
  );
}