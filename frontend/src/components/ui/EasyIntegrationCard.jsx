export default function EasyIntegrationCard({
  title = "Easy Integration",
  imgSrc = "/mnt/data/062f1bab-ecf8-44e5-9894-b1134fd22497.png",
}) {
  return (
    <div className="min-w-[60px] sm:min-w-[120px] md:min-w-[150px] lg:min-w-[170px] h-[50px] sm:h-[130px] md:h-[160px] lg:h-[180px] bg-[#ffffff] rounded-2xl sm:rounded-3xl flex flex-col items-center justify-center shadow-g">
      <div className="w-[20px] h-[20px] sm:w-[60px] sm:h-[60px] md:w-[75px] md:h-[75px] lg:w-[88px] lg:h-[88px] rounded-full mt-0.5 sm:mt-1 m-2 sm:m-3 md:m-4 lg:m-5 overflow-hidden flex items-center justify-center">
        <img src={imgSrc} alt={title} className="w-full h-full object-cover" />
      </div>
      <p className="text-[5px] sm:text-xs md:text-sm lg:text-[16px] font-medium text-gray-800 text-center px-1 sm:px-2">
        {title}
      </p>
    </div>
  );
}
