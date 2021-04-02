import {
	Container,
	Button,
	TextField,
	Typography,
	Card,
	CardContent,
	CardActions,
} from "@material-ui/core";
import React, { useContext } from "react";
import jwt_decode from "jwt-decode";
import { useForm } from "react-hook-form";
import { UserContext } from "../services/UserContext";

import config from "../config";

const Login = ({ history }) => {
	const { register, handleSubmit, errors } = useForm();
	const { user, setUser } = useContext(UserContext);

	const onSubmit = ({ username, password }) => {
		fetch(`${config.base_url}/api/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (!res.access_token) {
					throw new Error("Invalid Username or Password!");
				}
				const { username } = jwt_decode(res.access_token);
				localStorage.setItem("token", res.access_token);
				console.log(res.likedPrecs);
				setUser({ username: username, likedPrecs: res.likedPrecs });
				history.push("/");
			})
			.catch((e) => alert(e.message));
	};

	return (
		<Container maxWidth="xs">
			<Card>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CardContent>
						<Typography variant='h5' component="h2">로그인</Typography>
						<TextField
							name="username"
							label="Username"
							required
							fullWidth
							ref={register({ required: true })}
						/>
						<TextField
							type="password"
							name="password"
							label="Password"
							required
							fullWidth
							ref={register({ required: true })}
						/>
					</CardContent>
					<CardActions>
						<Button type="submit" variant="contained" color="primary">
							로그인
						</Button>
					</CardActions>
				</form>
			</Card>
		</Container>
	);
};

export default Login;
