/**
 * MapLibre vector style — Carto Voyager GL (roads, parks; pairs with tilted view).
 * Respect CARTO / OSM policies; use a commercial plan for heavy traffic.
 */
export const MAPLIBRE_STYLE_URL =
  "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json";

/**
 * Default “street” camera: pitched map (similar to Google Maps 3D / angled view).
 * Leaflet cannot do this; MapLibre applies pitch + bearing on the same style.
 */
export const MAP_STREET_CAMERA = {
  pitch: 0,
  bearing: 0,
};

/**
 * HalaPark corporate office — Office 3003, Concord Tower, 189 King Salman Bin
 * Abdulaziz Al Saud St, Al Sufouh 2, Dubai (Concord Tower / Dubai Media City).
 */
export const HALAPARK_DUBAI_HQ = {
  id: "halapark-hq",
  name: "HalaPark — HQ (Concord Tower, Dubai Media City)",
  mapLabel: "Concord Tower",
  lat: 25.09781,
  lng: 55.15619,
};

/**
 * Map framing: ~3 km across the view (1.5 km from HQ to each edge), Web Mercator.
 */
export const MAP_VIEW_HALF_SPAN_KM = 1.5;

export const PARKING_SPACES = [
  HALAPARK_DUBAI_HQ,
  {
    id: "bb-1",
    name: "Business Bay — Tower A",
    mapLabel: "Business Bay",
    lat: 25.1868,
    lng: 55.2643,
  },
  {
    id: "dm-1",
    name: "Dubai Mall — P1",
    mapLabel: "Dubai Mall",
    lat: 25.1984,
    lng: 55.2794,
  },
  {
    id: "difc-1",
    name: "DIFC — Gate District",
    mapLabel: "DIFC",
    lat: 25.2138,
    lng: 55.2844,
  },
  {
    id: "mar-1",
    name: "Dubai Marina — Marina Deck",
    mapLabel: "Dubai Marina",
    lat: 25.0802,
    lng: 55.1398,
  },
  {
    id: "jbr-1",
    name: "JBR — Beachfront",
    mapLabel: "JBR",
    lat: 25.0772,
    lng: 55.1328,
  },
  {
    id: "moe-1",
    name: "Mall of the Emirates",
    mapLabel: "Mall of Emirates",
    lat: 25.1181,
    lng: 55.2006,
  },
  {
    id: "deira-1",
    name: "Deira City Centre",
    mapLabel: "Deira City",
    lat: 25.2514,
    lng: 55.3322,
  },
  {
    id: "dxb-1",
    name: "DXB — Terminal vicinity",
    mapLabel: "DXB",
    lat: 25.2532,
    lng: 55.3657,
  },
  {
    id: "palm-1",
    name: "Palm Jumeirah — Crescent",
    mapLabel: "Palm Jumeirah",
    lat: 25.1124,
    lng: 55.139,
  },
  {
    id: "downtown-1",
    name: "Downtown — Boulevard",
    mapLabel: "Downtown",
    lat: 25.1972,
    lng: 55.2744,
  },
];

export function getMapLabel(p) {
  if (p.mapLabel && String(p.mapLabel).trim()) {
    return p.mapLabel.trim();
  }
  const raw = p.name || "";
  const cut = raw.split(/[—–-]/)[0];
  return cut.trim() || raw;
}
