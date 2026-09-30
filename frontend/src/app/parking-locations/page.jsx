import ParkingLocationsPage from "@/components/locations/ParkingLocationsPage";

// CMS-driven page — render per request so admin edits show without a rebuild.
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Parking Locations — HalaPark",
  description:
    "Explore HalaPark's towers and projects across Dubai, Abu Dhabi, Sharjah and Ajman — with certified sites and real driver reviews.",
};

export default function Page() {
  return <ParkingLocationsPage />;
}
