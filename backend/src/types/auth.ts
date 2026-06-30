export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type AuthTokenPayload = {
  sub: string;
  email: string;
  name: string;
};

export type AuthResponse = {
  user: AuthenticatedUser;
  token: string;
};
