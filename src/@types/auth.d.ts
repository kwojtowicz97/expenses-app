export type AuthContextType = {
  authData: {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: string;
  };
  loginViaLocalStorage: any;
  login: (user: string, password: string) => void;
  logout: () => void;
  createUser: (
    user: string,
    password: string,
    bool: boolean,
    firstName: string,
    lastName: string,
    usersData: any
  ) => void;
};
