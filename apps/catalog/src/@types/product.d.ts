export {};

declare global {
  interface ProductData {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    // images?: string[]
  }
}
