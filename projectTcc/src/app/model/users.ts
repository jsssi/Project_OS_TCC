export interface usersWeb {
  name: string;
  email: string;
  password: string;
  numberContact: number;
  cpf: string;
  phone: Array<{
    model: string,
    problem: string,
    date:Date,
    status: string,
  }>
}


