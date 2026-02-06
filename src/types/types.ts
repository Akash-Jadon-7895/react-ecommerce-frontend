
export type Product = {
  id: string;
  name: string;
  image: string;
  keywords: string[];
  priceCents: number;
  rating: {
    stars: number;
    count: number;
  };
  createdAt: string;
  updatedAt: string;
}

export type Products = Product[];

export type CartItem = {
  id: number;
  productId: Product["id"];
  quantity: number;
  deliveryOptionId: DeliveryOption["id"];
  product: Product;
  createdAt: string;
  updatedAt: string;
}

export type Cart = CartItem[];


export type DeliveryOption = {
  id: string;
  deliveryDays: number;
  priceCents: number;
  estimatedDeliveryTimeMs: number;
  createdAt: string;
  updatedAt: string;
}

export type DeliveryOptions = DeliveryOption[];


export type SelectedDeliveryOption = DeliveryOption | null;


export type PaymentSummary = {
  totalItems: number;
  productCostCents: number;
  shippingCostCents: number;
  totalCostBeforeTaxCents: number;
  taxCents: number;
  totalCostCents: number;
}

export type OrderProduct = {
  productId: Product["id"];
  quantity: number;
  estimatedDeliveryTimeMs: number;
  product: Product;
};

export type Order = {
  id: string;
  orderTimeMs: number;
  totalCostCents: number;
  products: OrderProduct[];
  createdAt: string;
  updatedAt: string;
};

export type Orders = Order[];

