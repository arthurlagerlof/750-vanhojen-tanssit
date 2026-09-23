"use client";

import { useEffect, useMemo } from "react";
import {
  MapContainer,
  Polygon,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";

import zoneGeometry from "@/data/delivery-zones.json";

interface DeliveryMapProps {
  value: string;
  onChange: (zoneId: string) => void;
}

type ZoneId = "keskusta" | "lahialue" | "seutu";

interface ZoneGeometry {
  name: string;
  polygons: number[][][];
}

interface GeometryFile {
  version: number;
  coordinateSystem: string;
  zones: Record<ZoneId, ZoneGeometry>;
}

const geometry = zoneGeometry as GeometryFile;

const ZONE_ORDER: ZoneId[] = [
  "seutu",
  "lahialue",
  "keskusta",
];

const ZONE_CONFIG: Record<
  ZoneId,
  {
    color: string;
    pane: string;
    zIndex: number;
  }
> = {
  seutu: {
    color: "#718096",
    pane: "delivery-seutu",
    zIndex: 600,
  },
  lahialue: {
    color: "#542d2c",
    pane: "delivery-lahialue",
    zIndex: 610,
  },
  keskusta: {
    color: "#d6b66a",
    pane: "delivery-keskusta",
    zIndex: 620,
  },
};

function DeliveryPanes() {
  const map = useMap();

  useEffect(() => {
    const panes = [
      {
        name: "delivery-seutu",
        zIndex: ZONE_CONFIG.seutu.zIndex,
      },
      {
        name: "delivery-lahialue",
        zIndex: ZONE_CONFIG.lahialue.zIndex,
      },
      {
        name: "delivery-keskusta",
        zIndex: ZONE_CONFIG.keskusta.zIndex,
      },
    ];

    for (const pane of panes) {
      const existingPane = map.getPane(pane.name);

      if (existingPane) {
        existingPane.style.zIndex = String(
          pane.zIndex,
        );
        continue;
      }

      const createdPane = map.createPane(
        pane.name,
      );

      createdPane.style.zIndex = String(
        pane.zIndex,
      );
    }
  }, [map]);

  return null;
}

function polygonToLatLng(
  polygon: number[][],
): LatLngExpression[] {
  return polygon.map(
    ([lat, lng]) => [lat, lng] as LatLngExpression,
  );
}

export function DeliveryMap({
  value,
  onChange,
}: DeliveryMapProps) {
  const selectedZoneName = useMemo(() => {
    if (!value) {
      return null;
    }

    return geometry.zones[value as ZoneId]?.name ?? null;
  }, [value]);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d294b]">
      <div className="relative h-[460px] w-full">
        <MapContainer
          center={[60.43, 22.32]}
          zoom={11}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <DeliveryPanes />

          {ZONE_ORDER.map((zoneId) => {
            const zone =
              geometry.zones[zoneId];

            const config =
              ZONE_CONFIG[zoneId];

            if (!zone) {
              return null;
            }

            return zone.polygons.map(
              (polygon, index) => {
                const positions =
                  polygonToLatLng(polygon);

                const isSelected =
                  value === zoneId;

                return (
                  <Polygon
                    key={`${zoneId}-${index}`}
                    positions={positions}
                    pane={config.pane}
                    pathOptions={{
                      color: isSelected
                        ? "#f6f1e7"
                        : config.color,
                      weight: isSelected ? 3 : 2,
                      opacity: 1,
                      fillColor:
                        config.color,
                      fillOpacity: 0.35,
                    }}
                    eventHandlers={{
                      click: () => {
                        onChange(zoneId);
                      },
                    }}
                  />
                );
              },
            );
          })}
        </MapContainer>

        <div className="pointer-events-none absolute left-4 top-4 z-[1000] rounded-xl bg-[#071b35]/95 px-4 py-3 text-xs text-[#f6f1e7] shadow-lg backdrop-blur">
          <p className="font-medium">
            Valitse toimitusalue
          </p>

          <p className="mt-1 text-[#aeb9c6]">
            Klikkaa kartalta haluamaasi aluetta.
          </p>
        </div>
      </div>

      <div className="grid gap-px bg-white/10 sm:grid-cols-3">
        <button
          type="button"
          onClick={() =>
            onChange("keskusta")
          }
          className={`bg-[#071b35] p-4 text-left transition ${
            value === "keskusta"
              ? "bg-[#a58a55]/20"
              : "hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#d6b66a]" />

            <span className="text-sm font-medium">
              Keskusta
            </span>
          </div>

          <p className="mt-1 text-xs text-[#8290a0]">
            3,00 €
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            onChange("lahialue")
          }
          className={`bg-[#071b35] p-4 text-left transition ${
            value === "lahialue"
              ? "bg-[#542d2c]/40"
              : "hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#542d2c]" />

            <span className="text-sm font-medium">
              Lähialue
            </span>
          </div>

          <p className="mt-1 text-xs text-[#8290a0]">
            5,00 €
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            onChange("seutu")
          }
          className={`bg-[#071b35] p-4 text-left transition ${
            value === "seutu"
              ? "bg-white/10"
              : "hover:bg-white/5"
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#718096]" />

            <span className="text-sm font-medium">
              Seutu
            </span>
          </div>

          <p className="mt-1 text-xs text-[#8290a0]">
            10,00 €
          </p>
        </button>
      </div>

      {selectedZoneName && (
        <div className="border-t border-white/10 bg-[#071b35] px-5 py-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[#d6b66a]">
            Valittu alue
          </p>

          <p className="mt-1 font-display text-2xl">
            {selectedZoneName}
          </p>
        </div>
      )}
    </div>
  );
}