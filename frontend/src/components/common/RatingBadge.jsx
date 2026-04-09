export default function RatingBadge({
  rating = "4.9",
  totalReviews = "4268",
  textColor = "#ffffff",
  shadow = "xl",
  border = true,
  className,
}) {
  return (
    <div
      className={`flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-2 sm:px-2.5 md:px-3 py-2 sm:py-2.5 md:py-3 z-20 rounded-full ${
        border ? `border border-white/40` : ""
      } backdrop-blur-md bg-white/10 shadow-${shadow}`}
    >
      {/* Avatars */}
      <div className="flex -space-x-2 sm:-space-x-3 md:-space-x-4">
        <img
          src="RatingPill1.png"
          alt=""
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full object-cover"
        />
        <img
          src="RatingPill2.png"
          alt=""
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full object-cover"
        />
        <img
          src="RatingPill3.png"
          alt=""
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full object-cover"
        />
      </div>

      {/* Text */}
      <p
        className={`text-[${textColor}] text-[10px] sm:text-xs md:text-sm lg:text-[14px] font-normal whitespace-nowrap ${className?.text}`}
      >
        <span className="font-semibold">{rating}/5</span>{" "}
        <span className="hidden sm:inline">from {totalReviews} customers</span>
        <span className="sm:hidden">from {totalReviews}</span>
      </p>

      {/* Star */}
      <div className="text-yellow-400 text-lg sm:text-xl md:text-2xl mr-1 sm:mr-1.5 md:mr-2">
        ★
      </div>
    </div>
  );
}
