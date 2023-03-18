export interface user {
  id?: string;
  name?: string;
  email: string;
  password: string;
  img?: string;
  role?: "USER" | "ADMIN";
  state?: boolean;
  auth?: boolean;
}
