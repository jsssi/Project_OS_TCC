import { phone } from "./Phone";
import { usersWeb } from "./users";

export interface Order {
  orderId:        number;
  description:    string;
  status:         string;
  price:          string;
  date:           string;
  user:           usersWeb;
  phone:          phone;
}
