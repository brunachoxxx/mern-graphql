export interface user {
  name: string;
  mail: string;
  password: string;
  img?: string;
  role: "USER" | "ADMIN";
  state?: boolean;
  googleAuth?: boolean;
}

export interface uQueryR {
  user: () => void;
  users: () => void;
}
