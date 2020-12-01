import React, { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet, Image, Text, Alert } from "react-native";
import { Input, Button } from "react-native-elements";
import { AuthNavProps } from "../Routes";
import { UserContext } from "../services/UserContext";
import Icon from "react-native-vector-icons/FontAwesome5";

type FormData = {
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
			<Controller
				control={control}
				render={({ onChange, onBlur, value }) => (
					<Input
						placeholder="username"
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						leftIcon={<Icon name="user-circle" size={24} color="gray" />}
					/>
				)}
				name="username"
				rules={{ required: true }}
				defaultValue=""
			/>
			{errors.username && <Text>This is required.</Text>}

			<Controller
				control={control}
				render={({ onChange, onBlur, value }) => (
					<Input
						placeholder="password"
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						secureTextEntry={true}
						leftIcon={<Icon name="lock" size={24} color="gray" />}
					/>
				)}
				name="password"
				rules={{ required: true }}
				defaultValue=""
			/>
			{errors.password && <Text>This is required.</Text>}

			<Controller
				control={control}
				render={({ onChange, onBlur, value }) => (
					<Input
						placeholder="email"
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						leftIcon={<Icon name="envelope" size={24} color="gray" />}
					/>
				)}
				name="email"
				rules={{ required: true }}
				defaultValue=""
			/>
			{errors.email && <Text>This is required.</Text>}

			<Controller
				control={control}
				render={({ onChange, onBlur, value }) => (
					<Input
						placeholder="first name"
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						leftIcon={<Icon name="address-card" size={24} color="gray" />}
					/>
				)}
				name="firstName"
				rules={{ required: true }}
				defaultValue=""
			/>
			{errors.firstName && <Text>This is required.</Text>}

			<Controller
				control={control}
				render={({ onChange, onBlur, value }) => (
					<Input
						placeholder="last name"
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						leftIcon={<Icon name="address-card" size={24} color="gray" />}
					/>
				)}
				name="lastName"
				rules={{ required: true }}
				defaultValue=""
			/>
			{errors.lastName && <Text>This is required.</Text>}

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
		justifyContent: "center",
		paddingHorizontal: 10
	},
	tinyLogo: {
		width: 120,
		height: 80
	}
});
