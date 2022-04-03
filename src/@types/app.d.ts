export interface Room {
    name?: string
    owner?: string;
    expenses?: Event[];
    creationDate?: string;
    users?: any[]
}

export interface Event {
  item: Event;
  date: string;
  users: string[];
  name: string;
  owner: string
  amount: string
}

export type AppContextType = {
  isError: boolean;
  error: string;
  rooms: Room[];
  room: Room;
  expense: Event;
  setExpense: (expense: Event) => void;
  setError: (error: string) => void;
  setIsError: (bool: boolean) => void;
  fetchRooms: () => void;
  setRoom: (room: Room) => void;
  fetchNewRoom: (name: string, owner: string) => Promise;
  fetchNewExpense: (expense: Expense) => Promise;
};


export type Expense = {
  amount: string;
  date: string;
  name: MutableRefObject<HTMLInputElement>;
  owner: string;
  users: {};
};