export const userActions = [
  {
    title: "Find My Parking",
    description:
      "Enter a zone or location, view live bay availability, and book a space in seconds.",
  },
  {
    title: "Pay for Parking",
    description:
      "Scan a QR, enter the zone code, or use ANPR to complete payment instantly in the app.",
  },
];

export const quickActions = ["Find My Parking", "Pay Now"];

export const serviceFlows = [
  {
    key: "public",
    label: "Public Parking",
    steps: ["Search", "Book", "Pay"],
    description:
      "Drivers can discover nearby public parking, secure a slot, and complete payment without leaving the app.",
  },
  {
    key: "private",
    label: "Private Rental",
    steps: ["List", "Manage", "Earn"],
    description:
      "Property owners can publish bays, control availability, and turn unused inventory into steady revenue.",
  },
  {
    key: "valet",
    label: "Valet",
    steps: ["Request", "Track", "Retrieve"],
    description:
      "Users request valet, track vehicle handoff status, and trigger retrieval at exactly the right time.",
  },
  {
    key: "ev",
    label: "EV Charging",
    steps: ["Locate", "Charge", "Pay"],
    description:
      "EV drivers can find charging-ready spots, begin a session, and settle the payment flow in one place.",
  },
];

export const appScreenshots = [
  {
    id: "discover",
    step: "01",
    label: "Home",
    title: "Find nearby parking in seconds",
    description:
      "Start from a clean home view that surfaces nearby zones, live pricing, and the quickest route to an available bay.",
    image: "/Booking.png",
  },
  {
    id: "map",
    step: "02",
    label: "Map",
    title: "Scan the map before you drive in",
    description:
      "Drivers can compare availability, spot types, and tower locations without bouncing between multiple parking apps.",
    image: "/Map.png",
  },
  {
    id: "booking",
    step: "03",
    label: "Booking",
    title: "Reserve the right bay with clarity",
    description:
      "The booking flow keeps timing, bay details, and vehicle information in one focused screen so the decision feels effortless.",
    image: "/Home (1).png",
  },
  {
    id: "payment",
    step: "04",
    label: "Payment",
    title: "Complete payment without friction",
    description:
      "A fast payment experience keeps pricing, duration, and confirmations visible while still feeling premium and calm.",
    image: "/Payment.png",
  },
  {
    id: "receipt",
    step: "05",
    label: "Receipt",
    title: "Keep every session and receipt organised",
    description:
      "Past bookings, transaction details, and proof of payment stay easy to revisit whenever users need them again.",
    image: "/recipt.png",
  },
];

export const featureHighlights = [
  {
    image: "dollar 1.png",
    title: "Ticketless entry",
    desc: "Enter and exit smoothly with digital access that removes the need for paper tickets.",
  },
  {
    image: "dollar 2.png",
    title: "Real-time availability",
    desc: "Check live space availability before you arrive so finding parking feels faster and easier.",
  },
  {
    image: "dollar 2-1.png",
    title: "Multiple payment methods",
    desc: "Pay for parking your way with flexible in-app options including cards and digital wallets.",
  },
  {
    image: "dollar4.png",
    title: "Live valet tracking",
    desc: "Track your valet request and vehicle status in real time from handoff to return.",
  },
  {
    image: "dollar5.png",
    title: "Booking history",
    desc: "View previous sessions, receipts, and trip details anytime you want a quick record of past parking.",
  },
  {
    image: "dollar6.png",
    title: "Push notifications",
    desc: "Stay updated with instant alerts for bookings, reminders, payment updates, and session changes.",
  },
];

export const downloadItems = [
  "Available on App Store",
  "Google Play ready",
  "Instant QR access",
  "Rated 4.9/5 by users",
];
