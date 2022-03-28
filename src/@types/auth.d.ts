export type AuthContextType = {
  token: string;
  name: string;
  isLoggedIn: boolean;
  login: (user: string, password: string) => void;
  logout: () => void;
  createUser: (user: string, password: string, bool: boolean) => void;
  checkAndLogin: () => void;
};
