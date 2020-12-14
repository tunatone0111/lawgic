import React, { useContext } from "react";
import jwt_decode from "jwt-decode";
import { Form, Button, Alert } from "react-bootstrap";
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
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
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
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group>
				<Form.Label>Username</Form.Label>
				<Form.Control
					name="username"
					type="text"
					placeholder="Username"
					ref={register({ required: true })}
				/>
				{errors.username && <Alert variant="danger">username required</Alert>}
			</Form.Group>
			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control
					name="password"
					type="password"
					placeholder="Password"
					ref={register({ required: true })}
				/>
				{errors.password && <Alert variant="danger">password required</Alert>}
			</Form.Group>
			<Button variant="warning" type="submit">
				로그인
			</Button>
		</Form>
	);
};

export default Login;
