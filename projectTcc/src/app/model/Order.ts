import { phone } from "./Phone";
import { usersWeb } from "./users";

export interface Order {

  id?: number;
  emission_date?: string;
  client_id?: {
    id?: number;
    first_name?: string;
    last_name?: string;
    email?: string;
    cpf?: string;
    address?: string;
    phone_number?: string;
    phone_id?: {
      id?: number;
      brand?: string;
      model?: string;
      phone_status?: string;
      problem_description?: string;
    };
  };
  description: string;
  material: string;
  estimatedTime: string;
}
