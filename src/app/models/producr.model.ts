
export interface Product {
  productName: string;
  category: string;
  brand?: string;
  quantity: number;
  price: number;
  location: string;
  description?: string;
  image?: File;
}
