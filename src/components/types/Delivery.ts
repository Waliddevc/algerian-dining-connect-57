
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
