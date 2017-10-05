export interface ILoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  userName: string;
  userId: string;
  email: string;
  roles: string;
  ".issued": string;
  ".expires": string;
}
