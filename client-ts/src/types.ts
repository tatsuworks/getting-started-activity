export type AuthResponse = {
  access_token: string;
  user: {
      username: string;
      discriminator: string;
      id: string;
      public_flags: number;
      avatar?: string | null | undefined;
      global_name?: string | null | undefined;
  };
}
