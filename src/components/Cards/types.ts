export interface AvailableType {
  inStock: boolean;
  name: string;
}

export interface CurrentVariant {
  currentVariant: LocalSelectedVariant;
  setCurrentVariant: (value: LocalSelectedVariant) => void;
}

export enum PrintMaterial {
  PLA = "PLA",
  RESIN = "RESIN",
}

enum Printer {
  FDM,
  SLA,
}
export interface Material {
  name: string;
  inStock: boolean;
}

export enum SizeOption {
  MINI = "MINI",
  SMALL = "SMALL",
  MEDIUM = "MEDIUM",
  LARGE = "LARGE",
  BFP = "BFP",
}

interface Category {
  id: string;
  name: string;
}

export interface LocalSizeVariant {
  name: SizeOption;
  price_modifier?: number;
}

export interface LocalColorVariant {
  name: string;
  material: Array<PrintMaterial>;
}
interface LocalOption {
  material: Array<PrintMaterial>;
  size: Array<LocalSizeVariant>;
  color: Array<LocalColorVariant>;
}

export interface Color {
  name: string;
  inStock: boolean;
  materials: Array<Material>;
}

interface Image {
  src: string;
  alt: string | null;
  products?: unknown;
}

export interface Size {
  name: string;
  priceModifier?: number | null;
}

export interface LocalProduct {
  id: string;
  name: string;
  tagline?: string | null;
  categories: Array<Category>;
  // tags: Array<string>;
  description: string;
  price: number;
  images: Array<Image>;
  // variant_options: LocalOption;
  colors: Array<Color>;
  materials: Array<Material>;
  sizes: Array<Size>;
}

export interface SimpleProduct {
  id: string;
  name: string;
  tagline?: string | null;
  categories: Array<Category>;
  // tags: Array<string>;
  description: string;
  price: number;
  images: Array<Image>;
}

export interface LocalSelectedVariant {
  color?: string;
  material?: string;
  size?: string;
}
