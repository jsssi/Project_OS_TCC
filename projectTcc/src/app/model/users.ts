import { phone } from "./Phone";

export interface usersWeb {
  client_id?: number;
  first_name: string;
  last_name: string;
  cpf: string;
  email: string;
  address: string;
  phone_number: string;
  phone_id?:phone
}


