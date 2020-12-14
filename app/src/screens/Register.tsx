import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { AuthNavProps } from "../Routes";
import { UserContext } from "../services/UserContext";

import TextForm from "../components/TextForm";
import Icon from "react-native-vector-icons/FontAwesome5";

export type FormData = {
	username: string;
	password: string;
	email: string;
	firstName: string;
	lastName: string;
};

export default function Register({
	navigation,
	route
}: AuthNavProps<"Register">) {
	const { user, setUser } = useContext(UserContext)!;
	const { control, handleSubmit, errors } = useForm<FormData>();

	const onSubmit = async ({
		username,
		password,
		email,
		firstName,
		lastName
	}: FormData) => {
		fetch("http://34.64.175.123:4000/api/users/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				password: password,
				email: email,
				firstName: firstName,
				lastName: lastName
			})
		})
			.then((res) => {
				if (res.status === 400) {
					res.json().then((res) => alert(res.message[0]));
				}
				return res.json();
			})
			.then((res) => {
				setUser(res);
				navigation.goBack();
			})
			.catch((e: Error) => {
				console.log("nono");
				Alert.alert(e.message);
			});
	};

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
			<Text style={styles.warning}>
				비밀번호가 암호화되지 않습니다!!! <br />
				쉬운 비밀번호를 설정하세요
			</Text>
			<TextForm
				name="email"
				icon="envelope"
				control={control}
				error={errors.email}
			/>
			<TextForm
				name="firstName"
				label="first name"
				icon="address-card"
				control={control}
				error={errors.firstName}
			/>
			<TextForm
				name="lastName"
				label="last name"
				icon="address-card"
				control={control}
				error={errors.lastName}
			/>
			<Button
				containerStyle={{ alignSelf: "stretch" }}
				title="회원가입"
				onPress={handleSubmit(onSubmit)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		paddingTop: 30,
		paddingHorizontal: 10
	},
	tinyLogo: {
		width: 120,
		height: 80
	},
	warning: {
		color: "red"
	}
});
