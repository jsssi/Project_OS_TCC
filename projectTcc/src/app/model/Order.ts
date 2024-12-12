import { phone } from "./Phone";
import { usersWeb } from "./users";

export interface Order {
  id?:number
  description: string;
  material: string;
  estimatedTime: string;
}
