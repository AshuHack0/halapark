export default function AppPromotionSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 relative overflow-hidden">
      {/* Map overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Park Smarter with the HalaPark App
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Find, book, and manage parking spots effortlessly. The only
              parking app designed to make your commute smoother and
              stress-free.
            </p>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.96-3.24-1.44-1.41-.6-2.35-.99-3.65-1.69C5.5 16.88 4.11 15.5 3.1 13.68c-1.02-1.84-1.5-3.8-1.5-5.9 0-2.2.6-4.2 1.8-5.9.6-.9 1.4-1.6 2.3-2.1.9-.5 1.9-.7 3-.7h.2c.4 0 .7.1 1 .3.3.2.5.5.6.9.1.4.1.8 0 1.2l-.3 1.1c-.2.6-.4 1.2-.6 1.8-.1.3-.2.6-.3.9-.1.3-.1.5 0 .8.1.3.2.5.4.7.2.2.4.3.7.4.3.1.5.1.8 0 .3-.1.6-.2.9-.3.6-.2 1.2-.4 1.8-.6l1.1-.3c.4-.1.8-.1 1.2 0 .4.1.7.3.9.6.2.3.3.6.3 1v.2c0 1.1-.2 2.1-.7 3-.5.9-1.2 1.7-2.1 2.3-1.7 1.2-3.7 1.8-5.9 1.8-2.1 0-4.06-.48-5.9-1.5z" />
                </svg>
                <span>Download Now On App Store</span>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                <span>Download Now On Play Store</span>
              </a>
            </div>
          </div>

          {/* Right Side - Phone Mockups */}
          <div className="relative flex justify-center lg:justify-end items-center min-h-[500px]">
            <div className="relative w-full max-w-md">
              {/* Phone 1 - Left */}
              <div className="relative z-10 transform -rotate-6 w-56 mx-auto lg:mx-0">
                <div className="w-full aspect-[9/19] bg-gray-800 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="bg-[#0088FF] px-4 py-2 text-white text-xs font-semibold">
                      Hala Park ALL ABOUT PARKING
                    </div>
                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                        <div className="font-bold text-base text-gray-900 mb-1">
                          Elia Garder Parking
                        </div>
                        <div className="text-xs text-gray-600 mb-3">
                          Sweetwood Drive, Arvada
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>1.2 km</span>
                          <span>500 cars</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone 2 - Right */}
              <div className="absolute top-12 left-32 lg:left-40 transform rotate-6 z-20 w-56">
                <div className="w-full aspect-[9/19] bg-gray-800 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                    {/* Status Bar */}
                    <div className="bg-[#0088FF] px-4 py-2 text-white text-xs font-semibold">
                      Hala Park
                    </div>
                    {/* Content */}
                    <div className="p-4 space-y-3">
                      <div className="bg-gray-50 rounded-xl p-4 shadow-sm">
                        <div className="text-xs font-semibold text-gray-600 mb-3">
                          Map View
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-4 h-4 bg-[#0088FF] rounded-full"></div>
                            <span className="text-gray-700">Private</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">Public</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                            <span className="text-gray-700">Valet</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                            <span className="text-gray-700">EVC</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
