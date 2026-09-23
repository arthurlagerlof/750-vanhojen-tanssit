export type DeliveryZoneId =
  | "keskusta"
  | "lahialue"
  | "seutu";

export interface DeliveryZone {
  id: DeliveryZoneId;
  name: string;
  feeCents: number;
  description: string;
}

export const deliveryZones: DeliveryZone[] = [
  {
    id: "keskusta",
    name: "Keskusta",
    feeCents: 300,
    description:
      "Turun ja Kaarinan keskusta-alueet.",
  },
  {
    id: "lahialue",
    name: "Lähialue",
    feeCents: 500,
    description:
      "Keskustojen ulkopuolinen lähialue.",
  },
  {
    id: "seutu",
    name: "Seutu",
    feeCents: 1000,
    description:
      "Muu toimitusalue Turun ja Kaarinan seudulla.",
  },
];