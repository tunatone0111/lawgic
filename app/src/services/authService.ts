export async function login() {}

export type User = {
	username: string;
	email: string;
	isAdmin: boolean;
	likedPrecs: string[];
};
