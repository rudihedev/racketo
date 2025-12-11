type Racket = {
  id: number;
  name: string;
  slug: string;
  weight: "2U" | "3U" | "4U" | "5U";
  createdAt: Date;
  updatedAt: Date;
};

type Rackets = Racket[];

export const dataRackets: Rackets = [
  {
    id: 1,
    name: "Astrox 100 ZZ",
    slug: "astrox",
    weight: "3U",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    name: "Thruster Ryuga II",
    slug: "thruster",
    weight: "4U",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 3,
    name: "BladeX 900",
    slug: "bladex",
    weight: "2U",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 4,
    name: "Nitrix Volta 70",
    slug: "nitrix",
    weight: "5U",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 5,
    name: "Ziggler LHI Pro III",
    slug: "ziggler",
    weight: "3U",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 6,
    name: "Voltage Z-Force II LCW Limited",
    slug: "voltage",
    weight: "3U",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
