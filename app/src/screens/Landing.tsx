import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { AuthNavProps } from "../Routes";
import { UserContext } from "../services/UserContext";
import login from "../services/authService";
import { PrecType } from "../services/precsService";
import Prec from "../components/Prec";

export default function Landing({
	navigation,
	route
}: AuthNavProps<"Landing">) {
	const { user, setUser } = useContext(UserContext)!;
	const [precs, setPrecs] = useState<PrecType[]>([]);

	useEffect(() => {
		fetch("http://localhost:4000/api/embed?q=저작권")
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setPrecs(res);
			});
	}, []);

	return (
		<View style={styles.container}>
			<Image style={styles.tinyLogo} source={require("../assets/logo.PNG")} />
			<Text>머신러닝 기반 판례 검색 시스템</Text>
			<Text>{user ? user.username : null}</Text>
			{!user ? (
				<Button
					title="LOG IN"
					onPress={async () => {
						const user = await login();
						setUser(user);
					}}
				></Button>
			) : (
				<Button
					title="LOG OUT"
					onPress={() => {
						setUser(null);
					}}
				></Button>
			)}
			<FlatList
				keyExtractor={(item) => item.caseNum}
				data={precs}
				renderItem={({ item }) => (
					<Prec title={item.title} caseNum={item.caseNum} />
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center"
	},
	tinyLogo: {
		width: 120,
		height: 80
	}
});
