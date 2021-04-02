import { CachedPrecType } from "./precsService";

export type User = {
	username: string;
	email?: string;
	password?: string;
	firstName?: string;
	lastName?: string;
	isAdmin?: boolean;
	likedPrecs?: CachedPrecType[];
};
