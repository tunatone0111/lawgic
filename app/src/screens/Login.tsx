import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet, Image, Text } from "react-native";
import { Input, Button, SocialIcon } from "react-native-elements";
import { AuthNavProps } from "../Routes";
import { UserContext } from "../services/UserContext";
import TextForm from "../components/TextForm";

type FormData = {
	username: string;
	password: string;
};

export default function Login({ navigation, route }: AuthNavProps<"Login">) {
	const { user, setUser } = useContext(UserContext)!;
	const { control, handleSubmit, errors } = useForm<FormData>();

	const onSubmit = async ({ username, password }: FormData) => {
		fetch("http://34.64.175.123:4000/api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
			.then((res) => {
				if (res.status == 401) {
					throw new Error("Unauthorized");
				}
				return res.json();
			})
			.then((res) => {
				setUser(res);
				navigation.navigate("Home");
			})
			.catch((e) => console.error(e));
	};

	// Auto Login for Test
	useEffect(() => {
		onSubmit({ username: "test user", password: "changeplz" });
	}, []);
	///////////////////////

	return (
		<View style={styles.container}>
			<Image style={styles.tinyLogo} source={require("../assets/logo.PNG")} />
			<TextForm
				name="username"
				icon="user-circle"
				control={control}
				error={errors.username}
			/>
			<TextForm
				name="password"
				icon="lock"
				control={control}
				error={errors.password}
				isSecure={true}
			/>
			<Button
				containerStyle={{ alignSelf: "stretch" }}
				title="로그인"
				onPress={handleSubmit(onSubmit)}
			/>
			<Button
				containerStyle={{ alignSelf: "stretch" }}
				title="회원가입"
				onPress={() => navigation.navigate("Register")}
				type="clear"
			/>
			{/* <SocialIcon title="Sign In With Facebook" button type="facebook" /> */}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 10
	},
	tinyLogo: {
		width: 120,
		height: 80
	}
});
