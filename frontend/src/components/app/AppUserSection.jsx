import Image from "next/image";
import { quickActions, userActions } from "./appContent";

function splitTitle(title) {
  const [accentWord, ...rest] = title.split(" ");

  return {
    accentWord,
    rest: rest.join(" "),
  };
}

export default function AppUserSection() {
  const cardImages = [
    "/hf_20260325_063932_a49c7704-9818-4a95-943a-653f6700c056-removebg-preview.png",
    "/hf_20260325_064333_5ff2db6d-9b47-4b99-b6fc-b6763a6d40cf-removebg-preview.png",
  ];

  return (
    <div className="grid gap-5 lg:grid-cols-2 max-w-7xl mx-auto sm:mb-40">
      {userActions.map((item, index) => {
        const { accentWord, rest } = splitTitle(item.title);
        const cardImage = cardImages[index % cardImages.length];

        return (
          <article
            key={item.title}
            className="group relative overflow-hidden rounded-[34px] border border-[#E8E0D6] bg-[#ffffff] p-6 transition-transform duration-300 hover:-translate-y-1 sm:min-h-[420px] sm:p-8"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.95),_rgba(255,255,255,0)_48%)]" />
            <div className="pointer-events-none absolute -bottom-16 right-[-14px] h-44 w-44 rounded-full bg-[rgba(0,136,255,0.08)] blur-2xl sm:h-56 sm:w-56" />

            <div className="relative flex h-full flex-col">
              <div className="max-w-[30rem]">
                <h3 className="text-[2rem] font-semibold tracking-[-0.05em] text-slate-900 sm:text-[2.6rem] sm:leading-[0.98]">
                  <span className="text-[#0088FF]">{accentWord}</span>
                  {rest ? <span>{` ${rest}`}</span> : null}
                </h3>

                <p className="mt-4 max-w-[30rem] text-[15px] leading-7 text-[#4F5B6F] sm:text-[17px]">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 flex flex-1 flex-col justify-end gap-6 sm:mt-10">
                <button
                  type="button"
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-[#0088FF] bg-white px-5 py-3 text-sm font-semibold text-[#0088FF] transition-colors duration-200 hover:bg-[rgba(0,136,255,0.06)] sm:px-6 sm:text-base"
                >
                  {quickActions[index] || item.title}
                  {/* <span aria-hidden="true" className="text-lg leading-none">
                    {"->"}
                  </span> */}
                </button>

                <div className="flex justify-end">
                  <div className="relative w-full max-w-[230px] sm:max-w-[270px]">
                    <Image
                      src={cardImage}
                      alt={item.title}
                      width={270}
                      height={220}
                      className="h-auto w-full object-contain object-bottom-right"
                    />
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
