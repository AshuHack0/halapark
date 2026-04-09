"use client";

const steps = [
  {
    number: "1",
    title: "Find",
    description: "Locate available parking near you in real time.",
    icon: "mapPin",
  },
  {
    number: "2",
    title: "Park",
    description: "Drive in, your plate is recognised automatically.",
    icon: "car",
  },
  {
    number: "3",
    title: "Pay",
    description: "Pay instantly through the app, no machines needed.",
    icon: "phoneCard",
  },
  {
    number: "4",
    title: "Done",
    description: "Hassle-free parking, every single time.",
    icon: "checkmark",
  },
];

const MapPinIcon = () => (
  <svg
    width="72"
    height="56"
    viewBox="0 0 72 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-slate-400 transition-colors duration-300 group-hover:text-white/45"
  >
    <path
      d="M36 44C36 44 48 32.6 48 24C48 17.4 42.6 12 36 12C29.4 12 24 17.4 24 24C24 32.6 36 44 36 44Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <circle cx="36" cy="24" r="4" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const CarIcon = () => (
  <svg
    width="72"
    height="56"
    viewBox="0 0 72 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-slate-400 transition-colors duration-300 group-hover:text-white/45"
  >
    <path
      d="M22 32L26 22H46L50 32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M20 32H52V38H20V32Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="26" cy="38" r="3" stroke="currentColor" strokeWidth="2" />
    <circle cx="46" cy="38" r="3" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const PhoneCardIcon = () => (
  <svg
    width="72"
    height="56"
    viewBox="0 0 72 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-slate-400 transition-colors duration-300 group-hover:text-white/45"
  >
    <rect
      x="20"
      y="12"
      width="16"
      height="28"
      rx="3"
      stroke="currentColor"
      strokeWidth="2"
    />
    <rect
      x="38"
      y="18"
      width="16"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M25 18H31"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M24 34H32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const CheckmarkIcon = () => (
  <svg
    width="72"
    height="56"
    viewBox="0 0 72 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-slate-400 transition-colors duration-300 group-hover:text-white/45"
  >
    <circle cx="36" cy="28" r="12" stroke="currentColor" strokeWidth="2" />
    <path
      d="M30 28L34 32L42 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const iconMap = {
  mapPin: MapPinIcon,
  car: CarIcon,
  phoneCard: PhoneCardIcon,
  checkmark: CheckmarkIcon,
};

export default function GettingStartedSteps() {
  return (
    <section className="bg-white py-10 sm:py-12 md:py-14">
      <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-12">
        <div className="flex items-center justify-center w-fit mx-auto gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
          <img
            src="/download(1).svg"
            alt="BLOG AND INSIGHTS"
            className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0"
          />
          <p className="text-xs sm:text-sm lg:text-[14px] text-black max-w-2xl mx-auto">
            How It Works
          </p>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-semibold text-gray-900 mb-3 sm:mb-4 tracking-tight">
          Parking Made Effortless — From <br /> Search to Exit
        </h2>
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white">
          <div className="steps-group flex flex-col md:min-h-[340px] md:flex-row md:overflow-visible">
            {steps.map((step, index) => {
              const Icon = iconMap[step.icon];

              return (
                <article
                  key={step.number}
                  className={`step-card group relative min-h-[220px] flex-1 overflow-hidden rounded-[2.25rem] border border-slate-300 bg-white px-6 py-7 shadow-[0_10px_28px_rgba(15,23,42,0.06)] transition-all duration-500 ease-out hover:border-[#0088FF] hover:bg-[#0088FF] hover:shadow-[0_22px_48px_rgba(0,136,255,0.18)] sm:px-7 sm:py-8 md:min-h-[340px] md:px-8 md:py-9 ${index !== 0 ? "md:-ml-10" : ""}`}
                  style={{ zIndex: steps.length - index }}
                >
                  <div className="flex h-full max-w-[16rem] flex-col">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-400 text-[1.35rem] font-semibold leading-none text-slate-900 transition-colors duration-300 group-hover:border-white/70 group-hover:text-white">
                      {step.number}
                    </div>
                    <h3 className="mt-7 text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.03em] text-slate-900 transition-colors duration-300 group-hover:text-white sm:text-[2.1rem] md:text-[2rem]">
                      {step.title}
                    </h3>
                    <p className="mt-5 max-w-[17rem] text-base leading-8 text-slate-600 transition-colors duration-300 group-hover:text-white/85">
                      {step.description}
                    </p>
                    <div className="pointer-events-none absolute bottom-7 right-7 opacity-55 transition duration-500 group-hover:translate-x-1 group-hover:opacity-100 md:bottom-8 md:right-8">
                      <Icon />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .steps-group:hover .step-card {
            flex: 0.9;
          }

          .steps-group .step-card:hover {
            flex: 1.3;
            z-index: 20 !important;
          }
        }
      `}</style>
    </section>
  );
}
