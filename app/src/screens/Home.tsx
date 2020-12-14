import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Avatar, Button, Header } from "react-native-elements";
import { AuthNavProps } from "../Routes";
import { UserContext } from "../services/UserContext";
import { CachedPrecType } from "../services/precsService";
import Prec from "../components/Prec";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Home({ navigation, route }: AuthNavProps<"Home">) {
	const { user, setUser } = useContext(UserContext)!;
	const [precs, setPrecs] = useState<CachedPrecType[]>([]);

	const handlePress = (id: string) => {
		navigation.navigate("PrecForm", { precId: id });
	};

	useEffect(() => {
		AsyncStorage.getItem("token").then((token) => {
			fetch("http://34.64.175.123:4000/api/precs/my", {
				headers: { Authorization: `Bearer ${token}` }
			})
				.then((res) => res.json())
				.then((precs) => setPrecs(precs));
		});
	}, []);

	return (
		<>
			<Header
				backgroundColor="#fb0"
				placement="left"
				leftComponent={<Text>Welcome! {user?.username}</Text>}
				rightComponent={
					!user ? (
						<Button
							title="로그인"
							onPress={() => navigation.navigate("Login")}
							containerStyle={{ alignSelf: "flex-end" }}
						></Button>
					) : (
						<Avatar
							rounded
							icon={{ name: "sign-out", type: "font-awesome" }}
							onPress={() => {
								setUser(null);
								navigation.goBack();
							}}
						/>
					)
				}
			/>
			<View style={styles.container}>
				<FlatList
					keyExtractor={(item) => item.objId}
					data={precs}
					renderItem={({ item }) => (
						<Prec
							id={item.objId}
							title={item.title}
							caseNum={item.caseNum}
							onPress={handlePress}
						/>
					)}
				/>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center"
	},
	tinyLogo: {
		width: "auto",
		height: "auto"
	}
});
