import { phone } from "./Phone";
import { usersWeb } from "./users";

export interface Order {
  emission_date :  Date;
  client_id?:      usersWeb;
  description:     string;
  material :       string;
  estimated_time : Date
}
