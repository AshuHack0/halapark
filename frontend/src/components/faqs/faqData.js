export const faqCategories = [
  {
    id: "about-halapark",
    title: "About HalaPark",
    icon: "Building2",
    items: [
      {
        id: "what-is-halapark",
        question: "What is HalaPark?",
        answer:
          "HalaPark is a smart parking platform that enables users to find, book, and manage parking spaces seamlessly through a digital experience.",
      },
      {
        id: "why-use-halapark",
        question: "Why should I use HalaPark?",
        answer:
          "HalaPark helps you save time, reduce parking stress, and access convenient parking locations while offering a fully cashless and user-friendly experience.",
      },
      {
        id: "where-operates",
        question: "Where does HalaPark operate?",
        answer: "HalaPark currently operates in Dubai and Abu Dhabi.",
      },
      {
        id: "who-can-use",
        question: "Who can use HalaPark?",
        answer:
          "HalaPark is available to individual drivers, businesses, and property owners looking to access or monetize parking spaces.",
      },
    ],
  },
  {
    id: "booking-reservations",
    title: "Booking & Reservations",
    icon: "CalendarCheck2",
    items: [
      {
        id: "book-in-advance",
        question: "Can I book parking in advance?",
        answer:
          "Yes, you can search and reserve available parking spaces in advance based on your preferred location and time.",
      },
      {
        id: "how-far-advance",
        question: "How far in advance can I reserve a space?",
        answer:
          "Booking availability depends on the specific location and parking provider. Available time slots will be displayed during booking.",
      },
      {
        id: "book-for-another",
        question: "Can I book parking for another person?",
        answer: "Yes, you can make a booking on behalf of another driver by entering the correct vehicle details.",
      },
      {
        id: "recurring-longterm",
        question: "Are recurring or long-term bookings available?",
        answer: "Yes, selected locations may offer recurring or long-term parking options, subject to availability.",
      },
      {
        id: "arrive-early-late",
        question: "What happens if I arrive earlier or later than my booking time?",
        answer:
          "Early or late arrival may affect your booking depending on availability and location policies. Additional charges may apply if your parking exceeds the reserved time.",
      },
      {
        id: "space-guaranteed",
        question: "Is my parking space guaranteed once booked?",
        answer: "Yes, confirmed bookings secure your parking space for the selected time, subject to the terms of the specific location.",
      },
    ],
  },
  {
    id: "parking-experience",
    title: "Parking Experience",
    icon: "CarFront",
    items: [
      {
        id: "how-parking-works",
        question: "How does parking work on HalaPark?",
        answer:
          "Simply search for a location, book your space, and follow the provided access instructions to park.",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "access-location",
        question: "How do I access the parking location?",
        answer:
          "Access methods vary by location and may include QR code entry, license plate recognition, or access instructions provided in your booking confirmation.",
      },
      {
        id: "entry-after-booking",
        question: "After making the booking, how can I enter the parking?",
        answer:
          "Once your vehicle is successfully registered, the gate barrier will open automatically upon entry, as our system is equipped with ANPR (Automatic Number Plate Recognition)..",
      },
      {
        id: "cannot-access",
        question: "What should I do if I cannot access the parking area?",
        answer: "Please contact HalaPark support immediately for assistance.",
      },
      {
        id: "spot-occupied",
        question: "What if another vehicle is occupying my reserved space?",
        answer: "Report the issue through support, and our team will assist in resolving it as quickly as possible.",
      },
      {
        id: "multiple-entries",
        question: "Are multiple entries and exits allowed during a booking?",
        answer: "Yes, multiple entries and exits are allowed as long as your booking remains valid within the reserved time period.",
      },
    ],
  },
  {
    id: "payments-pricing",
    title: "Payments & Pricing",
    icon: "WalletCards",
    items: [
      {
        id: "fees-calculated",
        question: "How are parking fees calculated?",
        answer:
          "FParking fees are based on location, duration, and the applicable parking tariff.",
      },
      {
        id: "payment-methods",
        question: "What payment methods are accepted?",
        answer: "HalaPark supports secure digital payments, including credit/debit cards.",
      },
        {
        id: "monthly-yearly-receipts",
        question: "Suggestion for Monthly/Yearly Booking – Will I receive invoices or receipts?",
        answer: "Yes, a digital receipt is provided for every completed transaction.",
      },
      {
        id: "receive-invoices",
        question: "Will I receive invoices?",
        answer: "Yes, digital receipts are provided.",
      },
      {
        id: "download-invoices",
        question: "How do I download invoices?",
        answer:
          "Go to Account > Bills, open the Paid section, select your order, preview it, then tap Download.",
      },
      {
        id: "duplicate-charges",
        question: "Can duplicate charges occur?",
        answer:
          "Duplicate charges are not expected. If you notice an issue, please contact support for review.",
      },
      {
        id: "payment-fails",
        question: "What happens if a payment fails?",
        answer: "Your booking will not be confirmed until payment is successfully completed.",
      },
    ],
  },
  {
    id: "cancellations-refunds",
    title: "Cancellations & Refunds",
    icon: "BadgePercent",
    items: [
      {
        id: "cancel-booking",
        question: "What if I want to cancel my booking??",
        answer: "If you wish to cancel your booking, you may send your request to our Accounts Team at accounts@halapark.com for assistance.",
      },
      {
        id: "refund-policy",
        question: "How long does it take to process refunds?",
        answer:
          "Refund will be process within 60days and 10% will be deducted for service charge.",
      },
    ],
  },
  {
    id: "extensions-overstay",
    title: "Extensions & Overstay",
    icon: "Clock3",
    items: [
      {
        id: "extend-parking",
        question: "Can I extend my parking duration?",
        answer: "Yes, you may extend your parking duration provided that the parking space is still available in the application at the time of extension.",
      },
      {
        id: "exceed-time",
        question: "What happens if I exceed my booked time?",
        answer: "Additional charges will apply based on the applicable parking tariff.",
      },
    ],
  },
  {
    id: "parking-rules",
    title: "Parking Rules",
    icon: "ShieldCheck",
    items: [
      {
        id: "rates-vary",
        question: "Do parking rates vary by location?",
        answer: "Yes, pricing depends on the location, demand, and service type.",
      },
      {
        id: "specific-rules",
        question: "Are there specific rules for each parking facility?",
        answer: "Yes, each location may have its own rules, which will be shared during booking.",
      },
      {
        id: "improper-parking",
        question: "What are the consequences of improper parking?",
        answer:
          "Improper parking may result in penalties, additional charges, or restricted access.",
      },
    ],
  },
  {
    id: "account-app",
    title: "Account & App",
    icon: "Smartphone",
    items: [
      {
        id: "account-required",
        question: "Is an account required to use HalaPark?",
        answer: "Yes, an account is required to book and manage parking.",
      },
      {
        id: "multiple-vehicles",
        question: "Can I register multiple vehicles under one account?",
        answer: "Yes, you may add and manage multiple vehicles under a single account. However, you will need to select the specific vehicle you intend to use.",
      },
      {
        id: "change-vehicle",
        question: "Can I change the vehicle after booking?",
        answer: "Vehicle changes are allowed only if the vehicle has not yet entered the parking premises. Once the vehicle is inside the facility, changes will no longer be permitted.",
      },
      {
        id: "booking-not-visible",
        question: "What should I do if my booking is not visible?",
        answer:
          "Please refresh the app or contact support if the issue persists.",
      },
      {
        id: "app-issues",
        question: "How do I resolve technical issues with the app?",
        answer: "Ensure your app is updated. If the issue continues, contact support for assistance.",
      },
    ],
  },
  {
    id: "vehicle-system",
    title: "Vehicle & System Issues",
    icon: "TriangleAlert",
    items: [
      {
        id: "incorrect-plate",
        question: "What if my vehicle plate is recorded incorrectly?",
        answer: "Please report the issue to support immediately to avoid incorrect charges.",
      },
      {
        id: "system-error",
        question: "What should I do in case of a system error?",
        answer: "Report the issue through support with relevant details for prompt assistance.",
      },
      {
        id: "session-not-recorded",
        question: "What if my parking session is not properly recorded?",
        answer: "Contact support, and the issue will be investigated and corrected if necessary.",
      },
    ],
  },
  {
    id: "safety-security",
    title: "Safety & Security",
    icon: "LockKeyhole",
    items: [
      {
        id: "secure-locations",
        question: "Are parking locations secure?",
        answer: "Yes, we ensure that all parking locations are secure, well-managed, and regularly monitored for safety and compliance.",
      },
      {
        id: "vehicle-monitored",
        question: "Is my vehicle monitored while parked?",
        answer: "Some locations offer surveillance or security services, depending on the facility.",
      },
    ],
  },
  {
    id: "owners-hosts",
    title: "Parking Owners / Hosts",
    icon: "Store",
    items: [
      {
        id: "list-space",
        question: "How can I list my parking space on HalaPark?",
        answer:
          "You can register as a partner and submit your parking space details through the platform.",
      },
      {
        id: "owner-earnings",
        question: "What earning potential can I expect?",
        answer: "Earnings depend on location, demand, and availability of your parking space.",
      },
      {
        id: "owner-fees",
        question: "Are there any fees for listing my parking space?",
        answer: "Fees and revenue-sharing models may apply depending on your agreement with HalaPark. Fulldetails are provided during onboarding.",
      },
      {
        id: "owner-payouts",
        question: "How and when are payments received?",
        answer:
          "Payments are processed securely and released based on the agreed payout schedule, once the booking has been successfully completed.",
      },
    ],
  },
  {
    id: "notifications-updates",
    title: "Notifications & Updates",
    icon: "BellRing",
    items: [
      {
        id: "booking-confirmations",
        question: "Will I receive booking confirmations?",
        answer: "Yes, confirmations are sent immediately after successful booking.",
      },
      {
        id: "expiry-reminders",
        question: "Are reminders sent before my parking expires?",
        answer: "Yes, notifications may be sent to help you manage your parking time.",
      },
      {
        id: "parking-history",
        question: "Can I view my parking history?",
        answer: "Yes, all past and active bookings are available in your account.",
      },
    ],
  },
  {
    id: "support-disputes",
    title: "Support & Disputes",
    icon: "Headset",
    items: [
      {
        id: "contact-support",
        question: "How can I contact support?",
        answer: "You can reach support through the HalaPark app or official contact channels.",
      },
      {
        id: "dispute-process",
        question: "How do I dispute a charge or report an issue?",
        answer: "Submit a request with relevant details, and the support team will investigate.",
      },
      {
        id: "resolution-time",
        question: "What is the typical resolution time for support requests?",
        answer: "Response times may vary, but most issues are addressed promptly.",
      },
    ],
  },
  {
    id: "fraud-awareness",
    title: "Security & Fraud Awareness",
    icon: "ShieldAlert",
    items: [
      {
        id: "verify-payments",
        question: "How do I verify payment requests?",
        answer: "Only use payments within the HalaPark platform or official channels.",
      },
      {
        id: "payment-links",
        question: "Does HalaPark send payment links via SMS or email?",
        answer: "HalaPark communicates only through verified channels. Always ensure the source is official.",
      },
      {
        id: "suspect-fraud",
        question: "What should I do if I suspect fraudulent activity?",
        answer: "Report the incident immediately to HalaPark support for investigation.",
      },
    ],
  },
];
