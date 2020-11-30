import React, { useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, StyleSheet, Image, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import { AuthNavProps } from "../Routes";
import { UserContext } from "../services/UserContext";
import Icon from "react-native-vector-icons/FontAwesome";

type FormData = {
	username: string;
	password: string;
};

export default function Login({ navigation, route }: AuthNavProps<"Login">) {
	const { user, setUser } = useContext(UserContext)!;
	const { control, handleSubmit, errors } = useForm<FormData>();

	const onSubmit = async ({ username, password }: FormData) => {
		console.log(username, password);
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
						leftIcon={<Icon name="user" size={24} color="gray" />}
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

			<Button
				containerStyle={{ alignSelf: "stretch" }}
				title="로그인"
				onPress={handleSubmit(onSubmit)}
			/>
			<Button
				containerStyle={{alignSelf: 'stretch'}}
				title="회원가입"
        onPress={()=>alert('WIP')}
        type='clear'
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
