import { PulseLogo } from "../../../components/common/Home/homecommon";

export default function SmartIntegrations() {
  const integrations = [
    { name: "Management", bgcolor: "bg-[#923BE2]", img: "/Group44.svg" },
    { name: "Maintenance", bgcolor: "bg-pink-600", img: "/Group77.png" },
    { name: "Technical Support", bgcolor: "bg-pink-600", img: "/Group11.svg" },
    { name: "Operations", bgcolor: "bg-[#4A44FE]", img: "/Group66.png" },
    { name: "Installation", bgcolor: "bg-pink-600", img: "/Group22.svg" },
    { name: "Equipment Supply", bgcolor: "bg-[#0088FF]", img: "/Group55.png" },
    { name: "Advisory Services", bgcolor: "bg-[#FA4162]", img: "/Group33.svg" },
  ];

  // Duplicate integrations for seamless loop
  const duplicatedIntegrations = [...integrations, ...integrations];

  return (
    <section className="bg-[#0A0A0A] relative overflow-hidden font-sans py-8 sm:py-12 md:py-16 lg:py-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-center items-center relative">
          <img
            src="/imgi_165_eVPQSYBoVqwchmpN78sjyYtovY.svg"
            alt="Smart Integrations"
            className="w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:w-150 lg:max-w-none h-30 lg:h-100 object-cover"
          />
          <img
            src="/giminilogo.svg"
            alt="Smart Integrations"
            className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 object-cover absolute top-[0%] sm:top-[38%] md:top-[39%] lg:top-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          />
          <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 absolute top-[60%] sm:top-[62%] md:top-[63%] lg:top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full px-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-semibold text-white mb-3 sm:mb-4">
              This is what parking looks like when{" "}
              <br className="hidden sm:block" /> technology actually gets it
              right.
            </h2>
            <p className="text-xs sm:text-sm md:text-[15px] text-gray-300 max-w-2xl mx-auto">
              Hala Park integrates with existing building management systems,
              property platforms, and access control infrastructure. Your
              current setup stays. Ours makes it smarter.
            </p>
          </div>
        </div>

        <div className="relative flex justify-center items-center mb-0 sm:mb-16 md:mb-20 lg:mb-20">
          {/* Central Location Pin */}
          <div className="absolute z-10">
            <div className="relative w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-62 lg:h-62 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
              <img
                src="/imgi_32_rRwo7mUtZ89fOzQy5lvrDQHYjo.png"
                alt="Smart Integrations"
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  sm:w-26 w-15 sm:h-26 h-15 object-cover z-10"
              />
              <div className="scale-100">
                <PulseLogo size={100} scale={1} />
              </div>
            </div>
          </div>

          {/* Integration Logos in Straight Line with Animation */}
          <div className="my-10 sm:my-12 md:my-14 lg:my-16 xl:my-20 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <style>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .scroll-animation {
                animation: scroll 30s linear infinite;
              }
            `}</style>
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 scroll-animation">
              {duplicatedIntegrations.map((integration, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 sm:gap-2 shrink-0 bg-transparent border border-white rounded-lg sm:rounded-xl px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 shadow-lg text-xs sm:text-sm font-medium text-white transition-transform"
                >
                  <div
                    className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 ${integration.bgcolor} rounded-[7px] flex items-center justify-center`}
                  >
                    <img
                      src={`${integration.img}`}
                      alt={integration.name}
                      className="w-4 h-4  object-cover"
                    />
                  </div>

                  <span className="text-white text-xs sm:text-sm font-medium whitespace-nowrap">
                    {integration.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
