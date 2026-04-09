"use client";

const markerPoints = [
  { left: "49%", top: "30%", delay: "0s" },
  { left: "55%", top: "34%", delay: "-0.6s" },
  { left: "59%", top: "38%", delay: "-1s" },
  { left: "63%", top: "32%", delay: "-1.4s" },
  { left: "57%", top: "43%", delay: "-1.8s" },
];

export default function GlobalMomentumGlobe() {
  return (
    <div className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center sm:h-[300px] sm:w-[300px]">
      <div className="pointer-events-none absolute inset-5 rounded-full bg-[radial-gradient(circle,rgba(0,136,255,0.24),rgba(0,136,255,0.1)_45%,transparent_72%)] blur-3xl" />
      <div className="globe-shell relative h-[220px] w-[220px] overflow-hidden rounded-full border border-[rgba(0,136,255,0.20)] bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.98),rgba(232,245,255,0.96)_40%,rgba(201,232,255,0.94)_72%,rgba(186,230,253,0.92)_100%)] shadow-[0_22px_54px_rgba(0,136,255,0.18),inset_0_1px_0_rgba(255,255,255,0.95)] sm:h-[250px] sm:w-[250px]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_38%,rgba(0,136,255,0.16),transparent_48%),radial-gradient(circle_at_50%_110%,rgba(0,136,255,0.28),transparent_44%)]" />
        <div className="absolute inset-[5%] rounded-full border border-[rgba(0,136,255,0.20)]" />
        <div className="absolute inset-y-0 left-1/2 w-[18%] -translate-x-1/2 rounded-full border border-[rgba(0,136,255,0.20)]" />
        <div className="absolute inset-y-0 left-1/2 w-[48%] -translate-x-1/2 rounded-full border border-[rgba(0,136,255,0.18)]" />
        <div className="absolute inset-y-0 left-1/2 w-[78%] -translate-x-1/2 rounded-full border border-[rgba(0,136,255,0.16)]" />
        <div className="absolute left-0 right-0 top-1/2 h-[18%] -translate-y-1/2 rounded-full border border-[rgba(0,136,255,0.18)]" />
        <div className="absolute left-0 right-0 top-[34%] h-[12%] -translate-y-1/2 rounded-full border border-[rgba(0,136,255,0.14)]" />
        <div className="absolute left-0 right-0 top-[66%] h-[12%] -translate-y-1/2 rounded-full border border-[rgba(0,136,255,0.14)]" />

        <div className="globe-continents absolute inset-0">
          <svg viewBox="0 0 250 250" className="h-full w-full" aria-hidden="true">
            <defs>
              <pattern
                id="halapark-globe-dots"
                x="0"
                y="0"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.15" fill="#0088FF" />
              </pattern>
              <filter id="halapark-globe-glow">
                <feGaussianBlur stdDeviation="1.4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <clipPath id="halapark-globe-mask">
                <circle cx="125" cy="125" r="123" />
              </clipPath>
            </defs>

            <g clipPath="url(#halapark-globe-mask)">
              <path
                d="M112 42C130 38 153 44 171 58C186 69 197 85 203 103C194 102 185 104 177 110C169 116 164 124 161 135C158 145 158 155 154 165C149 178 138 190 126 198C115 205 102 208 89 206C98 194 103 183 102 170C101 156 95 146 86 136C78 126 71 115 70 101C69 85 74 70 84 59C92 50 101 45 112 42Z"
                fill="url(#halapark-globe-dots)"
                filter="url(#halapark-globe-glow)"
              />
              <path
                d="M84 120C102 116 121 121 135 132C149 143 156 159 156 176C156 190 151 203 143 214C124 221 104 220 83 214C62 208 46 196 36 181C39 168 47 156 58 147C67 140 75 132 84 120Z"
                fill="url(#halapark-globe-dots)"
                opacity="0.92"
              />
              <path
                d="M155 64C168 60 180 63 190 71C181 78 174 85 170 93C166 101 166 111 169 121C173 130 180 137 189 143C181 151 171 154 160 151C150 148 142 141 138 131C133 119 134 106 139 93C143 80 148 70 155 64Z"
                fill="url(#halapark-globe-dots)"
                opacity="0.96"
              />
            </g>
          </svg>
        </div>

        {markerPoints.map((point, index) => (
          <div
            key={`${point.left}-${point.top}-${index}`}
            className="globe-pin absolute h-2.5 w-2.5 rounded-full bg-[#0088FF] shadow-[0_0_14px_rgba(0,136,255,0.55)]"
            style={{
              left: point.left,
              top: point.top,
              animationDelay: point.delay,
            }}
          />
        ))}

        <div className="absolute inset-0 rounded-full border border-[rgba(0,136,255,0.16)] shadow-[inset_0_0_28px_rgba(0,136,255,0.12)]" />
      </div>

      <style jsx>{`
        .globe-shell {
          animation: globe-float 7s ease-in-out infinite;
        }

        .globe-continents {
          animation: globe-spin 24s linear infinite;
          transform-origin: center;
        }

        .globe-pin {
          animation: globe-pin-pulse 2.8s ease-in-out infinite;
        }

        @keyframes globe-float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes globe-spin {
          0% {
            transform: rotate(0deg) scale(1.015);
          }
          100% {
            transform: rotate(360deg) scale(1.015);
          }
        }

        @keyframes globe-pin-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.7;
          }
          50% {
            transform: scale(1.7);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
