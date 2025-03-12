
export interface DeliveryItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export interface Delivery {
  id: number;
  client: string;
  address: string;
  phone: string;
  status: "pending" | "active" | "completed" | "canceled";
  total: number;
  deliveredAt?: string;
  rating?: number;
  items: DeliveryItem[];
}
