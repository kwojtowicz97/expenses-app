export type AuthContextType = {
  authData: {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: string;
  };
  usersData: any
  login: (user: string, password: string) => void;
  logout: () => void;
  createUser: (user: string, password: string, bool: boolean) => void;
};
