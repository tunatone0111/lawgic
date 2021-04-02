import { createContext, Dispatch } from "react";
import { User } from "./authService";

type UserContext_t = {
	user: User | null;
	setUser: Dispatch<React.SetStateAction<User | null>>;
};

export const UserContext = createContext<UserContext_t | undefined>(undefined);
