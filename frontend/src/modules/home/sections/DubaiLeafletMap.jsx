"use client";

import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  HALAPARK_DUBAI_HQ,
  MAP_STREET_CAMERA,
  MAP_VIEW_HALF_SPAN_KM,
  MAPLIBRE_STYLE_URL,
  PARKING_SPACES,
  getMapLabel,
} from "../data/parkingSpacesMap";

function buildPillMarkerEl(label) {
  const root = document.createElement("div");
  root.className = "halapark-pill-marker";
  root.innerHTML = `
    <div class="halapark-pill-marker__inner">
      <div class="halapark-pill-marker__pill">
        <span class="halapark-pill-marker__label"></span>
        <span class="halapark-pill-marker__badge" aria-hidden="true">
          <img src="/Layer_1.svg" alt="" width="18" height="18" decoding="async" />
        </span>
      </div>
      <div class="halapark-pill-marker__tip" aria-hidden="true"></div>
    </div>
  `;
  const span = root.querySelector(".halapark-pill-marker__label");
  if (span) {
    span.textContent = label;
  }
  return root;
}

export default function DubaiLeafletMap({ className = "" }) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) {
      return undefined;
    }

    let cancelled = false;

    (async () => {
      const maplibregl = (await import("maplibre-gl")).default;
      if (cancelled || !containerRef.current) {
        return;
      }

      const map = new maplibregl.Map({
        container: containerRef.current,
        style: MAPLIBRE_STYLE_URL,
        center: [HALAPARK_DUBAI_HQ.lng, HALAPARK_DUBAI_HQ.lat],
        zoom: 15,
        pitch: MAP_STREET_CAMERA.pitch,
        bearing: MAP_STREET_CAMERA.bearing,
        maxPitch: 72,
        attributionControl: true,
      });

      map.addControl(
        new maplibregl.NavigationControl({ showCompass: true }),
        "bottom-right",
      );
      map.addControl(
        new maplibregl.ScaleControl({ maxWidth: 100, unit: "metric" }),
        "bottom-left",
      );

      PARKING_SPACES.forEach((p) => {
        const label = getMapLabel(p);
        const node = buildPillMarkerEl(label);
        new maplibregl.Marker({
          element: node,
          anchor: "bottom",
          pitchAlignment: "viewport",
          rotationAlignment: "viewport",
        })
          .setLngLat([p.lng, p.lat])
          .addTo(map);
      });

      const hq = HALAPARK_DUBAI_HQ;
      const halfM = MAP_VIEW_HALF_SPAN_KM * 1000;
      const dLat = halfM / 111320;
      const dLng = halfM / (111320 * Math.cos((hq.lat * Math.PI) / 180));

      map.fitBounds(
        [
          [hq.lng - dLng, hq.lat - dLat],
          [hq.lng + dLng, hq.lat + dLat],
        ],
        {
          padding: { top: 52, bottom: 52, left: 44, right: 44 },
          maxZoom: 14.8,
          duration: 0,
        },
      );
      map.setPitch(MAP_STREET_CAMERA.pitch);
      map.setBearing(MAP_STREET_CAMERA.bearing);

      map.once("idle", () => {
        map.resize();
      });

      mapRef.current = map;
    })();

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`halapark-street-map z-0 h-full min-h-[200px] w-full ${className}`}
    />
  );
}
