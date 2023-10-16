import { TCategory } from "./categories";

export type TProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: TCategory;
  images: string[];
  amount?: number;
};
