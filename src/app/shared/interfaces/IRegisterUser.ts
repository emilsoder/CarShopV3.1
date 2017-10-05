export interface IRegisterUser {
  roleId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export class RegisterUser implements IRegisterUser {
  roleId: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
