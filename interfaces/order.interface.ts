export interface IFee {
  subTotal: number;
  total: number;
  deliveryFee: number;
  _id: string;
}

export interface IOrder {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  cityOrTown: string;
  streetAddress: string;
  phoneNumber: string;
  orderedItems: string[]; 
  fee: IFee;
  user: string; 
  orderStatus: "pending" | "completed" | "cancelled"; 
  orderId: string;
  createdAt: string;
  updatedAt: string; 
}
