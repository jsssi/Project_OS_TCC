import { usersWeb } from "./users";

export class OrderService {
  orderId!: number;
  status!: string;
  createdAt!: Date;
  user!: usersWeb;

  constructor(orderId: number, user: usersWeb) {
    this.orderId = orderId;
    this.status = "pendente";
    this.createdAt = new Date();
    this.user = user;
  }
}
