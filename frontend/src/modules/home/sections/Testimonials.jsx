"use client";

import { useState, useEffect } from "react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Handle window resize
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const testimonials = [
    {
      name: "Aisha R",
      title: "Property Owner, Dubai Marina",
      rating: 4,
      text: "I had two parking bays sitting empty for over a year. Listed them on Hala Park on a Tuesday. Both were booked by Thursday. The income now covers part of my service charges every month.",
      image: "imgi_38_ANzV36qYUnxIKmq0u2hYCbuyA30.png",
      bgColor: "bg-[#F7F7FE]",
    },
    {
      name: "Omar K,",
      title: "Customer, Business Bay",
      rating: 4,
      text: "We used to spend 20 minutes every morning hunting for parking near the office. Since switching to Hala Park, I book the night before and walk straight in. It has genuinely changed my mornings.",
      image: "imgi_63_y13E9h0wZ0TlqpbGXMISrZx6YVs.jpg",
      bgColor: "bg-[#F7F7FE]",
    },
    {
      name: "Jessica Brown",
      title: "Team Lead at BrightSolutions",
      rating: 4,
      text: "We integrated Hala Park into our building's car park in less than a week. Residents love the touchless entry, and we have reduced parking-related complaints by over 80%.",
      image: "imgi_41_z7MKCfs2kLf57EnFlS7rZkCe1Q.png",
      bgColor: "bg-[#F7F7FE]",
    },
    {
      name: "James Carter",
      title: "Project Manager at TechNova",
      rating: 4,
      text: "Managing parking is much easier now. Everything is in one system, payments are seamless, and the team always has clear visibility over daily operations.",
      image: "imgi_42_ixIJ2UH7mmjJC486D9CvoYxtytk.png",
      bgColor: "bg-[#F7F7FE]",
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="bg-white font-sans w-full py-8 sm:py-12 md:py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto mb-8 sm:mb-12 md:mb-16 lg:mb-20 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] hidden lg:block">
          <img
            src="/imgi_170_iDrlOYszhHrSmrgaFKo5G5kRV8.svg"
            alt="Testimonials"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mx-auto flex flex-col lg:flex-row w-full gap-6 sm:gap-8 lg:gap-10 relative">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 w-full lg:w-[40%] flex flex-col items-center lg:items-start justify-start lg:pl-30">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold tracking-tight text-gray-900 mb-3 sm:mb-4 leading-tight lg:leading-12">
            Trusted by People <br className="hidden sm:block" /> Who Park
            Smarter
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl sm:text-center lg:text-left">
            Property owners earning more. Customers arriving{" "}
            <br className="hidden lg:block" /> without the stress. Here is what
            they have to say.
          </p>
        </div>

        <div className="w-full lg:w-[60%] min-h-130">
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-2 overflow-hidden">
            {testimonials.map((testimonial, index) => {
              const distance = Math.abs(index - currentIndex);
              // Mobile (< 768px): show only current card (distance 0)
              // Tablet (768px - 1023px): show current + 1 side (distance <= 1)
              // Desktop (>= 1024px): show current + 1 on each side (distance <= 1)
              const maxDistance = windowWidth < 768 ? 0 : 1;
              const isVisible = distance <= maxDistance;

              if (!isVisible) return null;

              // Calculate position: -1 (left), 0 (center), 1 (right)
              const position = index - currentIndex;

              // Responsive card widths: Mobile (full), Tablet (50%), Desktop (41%)
              const cardWidth = "w-full sm:w-[48%] lg:w-[41%]";

              return (
                <div
                  key={index}
                  className={`shrink-0 transition-all duration-500 ${cardWidth} ${
                    position === 0
                      ? "scale-100 opacity-100"
                      : "scale-100 opacity-100"
                  }`}
                >
                  <div
                    className={`${
                      testimonial.bgColor
                    } rounded-2xl sm:rounded-3xl h-auto overflow-hidden min-h-[320px] sm:min-h-[320px] md:min-h-[360px] lg:h-130 ${
                      testimonial.featured ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {testimonial.featured ? (
                      <div className="relative w-full min-h-115 sm:min-h-130 flex items-center justify-center p-0 overflow-hidden bg-amber-600">
                        {/* Video */}
                        {isPlaying && (
                          <video onContextMenu={(e) => e.preventDefault()}
                            src="./8170425-uhd_1440_2560_25fps.mp4"
                            className="w-full h-full object-cover rounded-3xl"
                            autoPlay
                            controls={false}
                            onPause={() => setIsPlaying(false)}
                          />
                        )}

                        {/* Thumbnail + Play Button */}
                        {!isPlaying && (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <img
                              src={testimonial.image}
                              alt="Video Thumbnail"
                              className="w-full h-full object-cover rounded-3xl"
                            />

                            {/* Play Button */}
                            <button
                              onClick={() => setIsPlaying(true)}
                              className="absolute top-6 left-6 flex items-center justify-center w-11 h-11 bg-[#F7894D] backdrop-blur-md rounded-full shadow-lg hover:scale-105 transition-all duration-300"
                            >
                              <svg
                                className="w-5 h-5  text-white ml-0"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M6 4l12 6-12 6V4z" />
                              </svg>
                            </button>
                          </div>
                        )}

                        {/* Pause Button (visible while playing) */}
                        {isPlaying && (
                          <button
                            onClick={() => setIsPlaying(false)}
                            className="absolute top-6 left-6 bg-white/80 backdrop-blur-md w-11 h-11 rounded-full flex items-center justify-center shadow-md"
                          >
                            <svg
                              className="w-6 h-6 text-black"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M6 4h3v12H6zM11 4h3v12h-3z" />
                            </svg>
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="flex flex-col min-h-115 sm:min-h-130 p-4 sm:p-6 md:p-8 border-2 border-[#dfe0f8] rounded-2xl sm:rounded-3xl">
                        {/* Stars at the top */}
                        <div className="flex mb-3 sm:mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 sm:w-5 sm:h-5 text-black"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>

                        {/* Testimonial text */}
                        <p className="text-[#535353] text-base sm:text-lg lg:text-[20px] mb-4 sm:mb-6 leading-relaxed grow">
                          {testimonial.text}
                        </p>

                        {/* Profile section at bottom */}
                        <div className="flex items-center mt-auto">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-orange-500 flex items-center justify-center text-xl sm:text-2xl shrink-0 mr-3 sm:mr-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.3),0_2px_4px_-1px_rgba(0,0,0,0.2)] overflow-hidden border-3 border-white">
                            <img
                              src={testimonial.image}
                              alt=""
                              className="h-full w-full"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800 text-sm sm:text-base">
                              {testimonial.name}
                            </p>
                            <p className="text-gray-500 text-xs sm:text-sm">
                              {testimonial.title}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-2 sm:left-27 md:left-27 lg:left-27 top-[100%] sm:top-[55%] lg:top-[60%] transform -translate-y-1/2 text-white p-2 sm:p-3 rounded-full transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <img
              src="/imgi_178_K3YtoO81ZiQgTf1jDdsJ9y1pI.png"
              alt="Previous"
              className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
            />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-2 sm:right-4 md:right-8 lg:left-41 lg:right-auto top-[100%] sm:top-[55%] lg:top-[60%] transform -translate-y-1/2 text-white p-2 sm:p-3 rounded-full transition-colors z-10"
            aria-label="Next testimonial"
          >
            <img
              src="/imgi_179_gTRENw5OR8ywXmFiT9I6QaizgA.png"
              alt="Next"
              className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9"
            />
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}
