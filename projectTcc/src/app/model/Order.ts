import { usersWeb } from "./users";
export interface Order {
  orderId: number;
  description: string;
  status: string;
  date: Date;
  user: usersWeb;
}
