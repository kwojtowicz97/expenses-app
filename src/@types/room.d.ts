export interface Room {
    name: string
}

export type AppContextType = {
  isError: boolean;
  error: string;
  rooms: Room[];
  room: Room;
  setError: (error: string) => void;
  setIsError: (bool: boolean) => void;
  fetchRooms: () => void;
  setRoom: (room: Room) => void;
};