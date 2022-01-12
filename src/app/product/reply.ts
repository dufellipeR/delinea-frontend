import { Product } from "./product";

export interface Reply {
  count: number;
  next: string;
  previous: string;
  results: Product[]
}
