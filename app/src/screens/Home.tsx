import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Avatar, Button, Header } from "react-native-elements";
import { AuthNavProps } from "../Routes";
import { UserContext } from "../services/UserContext";
import { CachedPrecType } from "../services/precsService";
import Prec from "../components/Prec";

export default function Home({ navigation, route }: AuthNavProps<"Home">) {
	const { user, setUser } = useContext(UserContext)!;
	const [precs, setPrecs] = useState<CachedPrecType[]>([]);

	const handlePress = (id: string) => {
		navigation.navigate("PrecForm", { precId: id });
	};

	useEffect(() => {
		console.log(user!.likedPrecs);
		fetch("http://34.64.175.123:4000/api/embed?q=저작권")
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setPrecs(res);
			});
	}, []);

	return (
		<>
			<Header
				backgroundColor="#fb0"
				placement="left"
				leftComponent={
					<Avatar rounded icon={{ name: "home", type: "font-awesome" }} />
				}
				centerComponent={
					<>
						<Image
							style={styles.tinyLogo}
							source={require("../assets/logo.PNG")}
						/>
						<Text style={{ paddingBottom: 20 }}>
							머신러닝 기반 판례 검색 시스템
						</Text>
					</>
				}
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
					keyExtractor={(item) => item.precId}
					data={precs}
					renderItem={({ item }) => (
						<Prec
							id={item.precId}
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
