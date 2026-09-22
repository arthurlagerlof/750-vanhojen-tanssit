export type ProductCategory = "makeat" | "suolaiset";

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  category: ProductCategory;
}

export const products: Product[] = [
  {
    id: "aidin-suklaapalloset",
    name: "Äidin suklaapalloset",
    image: "/products/aidin_suklaapalloset.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "ellan-lumipalloset",
    name: "Ellan lumipalloset",
    image: "/products/ellan_lumipalloset.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "hermannin-herkkunakkileipa",
    name: "Hermannin herkkunäkkileipä",
    image: "/products/hermannin_herkkunakkileipa.webp",
    price: 8,
    category: "suolaiset",
  },
  {
    id: "isan-punssipalloset",
    name: "Isän punssipalloset",
    image: "/products/isan_punssipalloset.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "isoisan-suosikit",
    name: "Isoisän suosikit",
    image: "/products/isoisan_suosikit.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "isosiskon-salaiset-suklaaunelmat",
    name: "Isosiskon salaiset suklaaunelmat",
    image: "/products/isosiskon_salaiset_suklaaunelmat.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "isoaidin-suklaakeksit",
    name: "Isoäidin suklaakeksit",
    image: "/products/isoäidin_suklaakeksit.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "jennan-juusto-valkosipulinakkileipa",
    name: "Jennan juusto-valkosipulinäkkileipä",
    image: "/products/jennan_juusto-valkosipulinakkileipa.webp",
    price: 8,
    category: "suolaiset",
  },
  {
    id: "kapteenin-lakritsasekoitus",
    name: "Kapteenin lakritsasekoitus",
    image: "/products/kapteenin_lakritsasekoitus.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "kasperin-mutakakkupalloset",
    name: "Kasperin mutakakkupalloset",
    image: "/products/kasperin_mutakakkupalloset.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "millan-kookospikkuleivat",
    name: "Millan kookospikkuleivät",
    image: "/products/millan_kookospikkuleivat.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "minnan-minttusuklaakeksit",
    name: "Minnan minttusuklaakeksit",
    image: "/products/minnan_minttusuklaakeksit.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "papan-keksisuklaat",
    name: "Papan keksisuklaat",
    image: "/products/papan_keksisuklaat.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "pikkuveljen-toffeesekoitus",
    name: "Pikkuveljen toffeesekoitus",
    image: "/products/pikkuveljen_toffeesekoitus.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "serkun-suklaiset",
    name: "Serkun suklaiset",
    image: "/products/serkun_suklaiset.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "tenavien-toivekarkit",
    name: "Tenavien toivekarkit",
    image: "/products/tenavien_toivekarkit.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "toivon-toffeepalloset",
    name: "Toivon toffeepalloset",
    image: "/products/toivon_toffeepalloset.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "tonttumuorin-piparisydamet",
    name: "Tonttumuorin piparisydämet",
    image: "/products/tonttumuorin_piparisydamet.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "tuulian-kirpeanmakeat-karkit",
    name: "Tuulian kirpeänmakeat karkit",
    image: "/products/tuulian_kirpeänmakeat_karkit.webp",
    price: 8,
    category: "makeat",
  },
  {
    id: "valentinan-nakkileipa",
    name: "Valentinan näkkileipä",
    image: "/products/valentinan_nakkileipa.webp",
    price: 8,
    category: "suolaiset",
  },
  {
    id: "vilman-valipalapatukat",
    name: "Vilman välipalapatukat",
    image: "/products/vilman_valipalapatukat.webp",
    price: 8,
    category: "makeat",
  },
];