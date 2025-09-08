export interface RegisterCredentials {
  username: string;
  password: string;
}

export interface LoginCredentials extends RegisterCredentials {}