export interface usersWeb {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone: Array<{
    model: string,
    problem: string,
    date:Date,
    status: string,
    numberContact: number
  }>
}


