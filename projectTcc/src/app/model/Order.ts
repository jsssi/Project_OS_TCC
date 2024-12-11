import { phone } from "./Phone";
import { usersWeb } from "./users";

export interface Order {
  clientId?:      usersWeb;
  description:     string;
  material :       string;
  estimateTime : Date
}
