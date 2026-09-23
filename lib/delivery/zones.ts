export const DELIVERY_CENTERS = [
  {
    id: "turku",
    name: "Turun keskusta",
    lat: 60.4518,
    lng: 22.2666,
  },
  {
    id: "kaarina",
    name: "Kaarinan keskusta",
    lat: 60.4081,
    lng: 22.368,
  },
] as const;

export const DELIVERY_ZONE_RADII = {
  keskusta: 3_000,
  lahialue: 7_000,
} as const;

export const DELIVERY_MAP_CENTER = {
  lat: 60.43,
  lng: 22.32,
} as const;

export const DELIVERY_MAP_ZOOM = 11;

export function distanceInMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
) {
  const earthRadius = 6_371_000;

  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const deltaLat = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLng / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
}

export function distanceToNearestCenter(
  lat: number,
  lng: number,
) {
  return Math.min(
    ...DELIVERY_CENTERS.map((center) =>
      distanceInMeters(
        lat,
        lng,
        center.lat,
        center.lng,
      ),
    ),
  );
}

export function getZoneFromCoordinates(
  lat: number,
  lng: number,
) {
  const distance = distanceToNearestCenter(lat, lng);

  if (distance <= DELIVERY_ZONE_RADII.keskusta) {
    return "keskusta" as const;
  }

  if (distance <= DELIVERY_ZONE_RADII.lahialue) {
    return "lahialue" as const;
  }

  return "seutu" as const;
}