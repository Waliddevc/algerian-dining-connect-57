
export interface Delivery {
  id: number;
  client: string;
  address: string;
  phone: string;
  status: "pending" | "in-progress" | "delivered" | "completed";
  total: number;
  deliveredAt?: string;
  rating?: number;
  items: string[];
}

export interface DeliveryItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
}
