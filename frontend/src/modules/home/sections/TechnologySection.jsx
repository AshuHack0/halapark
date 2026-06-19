"use client";

import { useEffect, useState } from "react";
import EasyIntegrationCard from "../../../components/ui/EasyIntegrationCard";
import { fetchHomeSection } from "@/lib/cms";

const DEFAULT_TECH = {
  heading: "All-in-One Intelligent",
  headingGradient: "System",
  subtitle:
    "Redefining the future of smart parking management with one connected system for automation, insights, and operations.",
};

export default function TechnologySection() {
  const [tech, setTech] = useState(DEFAULT_TECH);

  useEffect(() => {
    fetchHomeSection("technologySection").then((d) => {
      if (d && typeof d === "object") setTech({ ...DEFAULT_TECH, ...d });
    });
  }, []);

  const loop1 = [
    {
      id: 1,
      image: "/imgi_113_1g4Qo4Xv0r8JP0huQp8QQxF9sU.png",
      title: "Valet On Demand",
      img: false,
    },
    {
      id: 2,
      image: "/imgi_110_lGEo0kaWUirwy8w0X2zu2peiRFI.jpg",
      title: "HalaPark Technology",
      img: true,
    },
    {
      id: 3,
      image: "/imgi_119_VPtiOrlPqrUH6inAid1iVLnqDw.png",
      title: "Seamless Experience",
      img: false,
    },
    {
      id: 4,
      image: "/imgi_120_G2ZZxM78k3aMiEnSt71QSsxmFU.png",
      title: "arab man",
      img: true,
    },
    {
      id: 5,
      image: "/imgi_121_p5WDsTiWBnR6psINubkF941BY.png",
      title: "Easy Payments",
      img: false,
    },

    {
      id: 6,
      image: "/imgi_17_RZmMl1qdcLP0di0AmOgkQLE8ehQ.png",
      title: "HalaPark Technology",
      img: true,
    },
    {
      id: 7,
      image: "/imgi_110_lGEo0kaWUirwy8w0X2zu2peiRFI.jpg",
      title: "HalaPark Technology",
      img: true,
    },
    {
      id: 8,
      image: "/imgi_113_1g4Qo4Xv0r8JP0huQp8QQxF9sU.png",
      title: "Valet On Demand",
      img: false,
    },
    {
      id: 9,
      image: "/imgi_52_jrKxnhujFruOStY7hW7O5YxmU.jpg",
      title: "HalaPark Technology",
      img: true,
    },
    {
      id: 10,
      image: "/imgi_119_VPtiOrlPqrUH6inAid1iVLnqDw.png",
      title: "Seamless Experience",
      img: false,
    },
    {
      id: 11,
      image: "/imgi_120_G2ZZxM78k3aMiEnSt71QSsxmFU.png",
      title: "arab man",
      img: true,
    },
  ];
  const loop2 = [
    {
      id: 1,
      image: "/imgi_22_UBbLcu5oDOTH71yMBqwOYljdec.jpg",
      title: "arab man 2",
      img: true,
    },
    {
      id: 2,
      image: "/imgi_139_klLoSzJdlmd17l6Zs5Lc4qwK9c.png",
      title: "Easy Integration",
      img: false,
    },
    {
      id: 3,
      image: "/imgi_140_pNFGIY7IadeAsK5Dc6uONhINB0.png",
      title: "HalaPark Technology",
      img: true,
    },
    {
      id: 4,
      image: "/imgi_18_EwAMq9ZBkZZYiEv4batLACk0iww.jpg",
      title: "HalaPark Technology",
      img: true,
    },
    {
      id: 5,
      image: "/imgi_128_PTqZ69hbrHEIDQDjkFuz7umHA.png",
      title: "EV Parking",
      img: false,
    },
    {
      id: 6,
      image: "/imgi_54_YWkcqi9gsxDBmfiVE6mQcexGrkI.webp",
      title: "HalaPark Technology",
      img: true,
    },
    {
      id: 7,
      image: "/imgi_132_Gem3pT18VnozOrWmd4EVprLjIeg.png",
      title: "Easy Integration",
      img: false,
    },
    {
      id: 8,
      image: "/imgi_22_UBbLcu5oDOTH71yMBqwOYljdec.jpg",
      title: "arab man 2",
      img: true,
    },
    {
      id: 9,
      image: "/imgi_139_klLoSzJdlmd17l6Zs5Lc4qwK9c.png",
      title: "Easy Integration",
      img: false,
    },
    {
      id: 10,
      image: "/imgi_54_YWkcqi9gsxDBmfiVE6mQcexGrkI.webp",
      title: "HalaPark Technology",
      img: true,
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-16 pb-0 md:pb-0 lg:pb-0 md:pt-20 lg:pt-24 bg-[#EFF1F3] font-sans overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-0">
          {/* <div className="flex items-center justify-center w-fit mx-auto gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
            <img
              src="/download(1).svg"
              alt="BLOG AND INSIGHTS"
              className="w-4 h-4 sm:w-5 sm:h-5 text-white shrink-0"
            />
            <p className="text-xs sm:text-sm lg:text-[14px] text-black max-w-2xl mx-auto">
              All-in-One System
            </p>
          </div> */}
          {/* <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[56px] font-semibold text-gray-900 mb-3 sm:mb-4 tracking-tight">
            Redefining Luxury Parking Management
          </h2> */}
          <div className="mx-auto max-w-[980px] text-center">
            <h2
              id="ai-powered-parking-service-title"
              className="mx-auto mt-4 max-w-[940px] text-[clamp(2.65rem,4.5vw,4rem)] font-semibold uppercase leading-[1.01] tracking-[-0.06em] text-[#050A13]"
            >
              {tech.heading}{" "}
              <span className="bg-[linear-gradient(120deg,#0078E0_10%,#1AB2FF_90%)] bg-clip-text text-transparent">
                {tech.headingGradient}
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-[650px] text-[0.88rem] leading-6 text-slate-600 sm:text-[0.94rem]">
              {tech.subtitle}
            </p>
          </div>
          {/* <p className="text-sm sm:text-base lg:text-[16px] font-medium text-[#6D6D6D] max-w-2xl mx-auto px-4 sm:px-0">
            Hala Park combines intelligent automation with on-the-ground
            expertise to set a new standard for parking management - seamless
            for customers, profitable for owners, effortless for businesses.
          </p> */}
        </div>

        <div className="relative flex justify-center items-center py-4 sm:py-6 md:py-8 lg:py-0 h-[500px] sm:h-[500px] md:h-[600px] lg:h-[700px] [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
          {/* Central Smartphone */}
          <div className="z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-[190px] sm:w-[180px] md:w-[230px] lg:w-[280px] xl:w-[320px] h-[370px] sm:h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]">
              <img
                src="/imgi_141_N9Y3S3zXP5Dksf1yurkaiZ9KrU.png"
                alt="HalaPark Technology"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 w-full">
            <div className="overflow-x-hidden w-full">
              <style>{`
                @keyframes scrollLeft {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(-50%);
                  }
                }
                .animate-scroll-left {
                  animation: scrollLeft 20s linear infinite;
                }
              `}</style>
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 animate-scroll-left">
                {[...loop1, ...loop1].map((item, index) =>
                  item.img === false ? (
                    <EasyIntegrationCard
                      key={`${item.id}-${index}`}
                      title={item.title}
                      imgSrc={item.image}
                    />
                  ) : (
                    <div
                      key={`${item.id}-${index}`}
                      className="w-[50px] h-[50px] sm:w-[120px] sm:h-[130px] md:w-[150px] md:h-[160px] lg:w-[170px] lg:h-[180px] object-cover overflow-hidden rounded-xl sm:rounded-2xl shadow-lg shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
            <div className="overflow-x-hidden w-full">
              <style>{`
                @keyframes scrollRight {
                  0% {
                    transform: translateX(-50%);
                  }
                  100% {
                    transform: translateX(0);
                  }
                }
                .animate-scroll-right {
                  animation: scrollRight 25s linear infinite;
                }
              `}</style>
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 animate-scroll-right">
                {[...loop2, ...loop2].map((item, index) =>
                  item.img === false ? (
                    <EasyIntegrationCard
                      key={`${item.id}-${index}`}
                      title={item.title}
                      imgSrc={item.image}
                    />
                  ) : (
                    <div
                      key={`${item.id}-${index}`}
                      className="w-[50px] h-[50px] sm:w-[120px] sm:h-[130px] md:w-[150px] md:h-[160px] lg:w-[170px] lg:h-[180px] object-cover overflow-hidden rounded-xl sm:rounded-2xl shadow-lg shrink-0"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
