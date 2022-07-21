export interface Room {
    name?: string
    owner?: string;
    expenses?: Event[];
    creationDate?: string;
    users?: any[]
}


export type AppContextType = {
  isError: boolean;
  error: string;
  rooms: string[];
  setError: (error: string) => void;
  setIsError: (bool: boolean) => void;
  fetchRooms: () => void;
};


export type Expense = {
  amount: string;
  date: string;
  name: MutableRefObject<HTMLInputElement>;
  owner: string;
  users: {};
};