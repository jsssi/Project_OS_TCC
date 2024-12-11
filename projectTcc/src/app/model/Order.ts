import { phone } from "./Phone";
import { usersWeb } from "./users";

export interface Order {
  id?: number;
  clientId?:      usersWeb;
  description:     string;
  material :       string;
  estimateTime : Date
}
