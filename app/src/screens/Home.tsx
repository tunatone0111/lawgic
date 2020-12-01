import React, { useContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { AuthNavProps } from "../Routes";
import { UserContext } from "../services/UserContext";
import { PrecType } from "../services/precsService";
import Prec from "../components/Prec";

export default function Home({
	navigation,
	route
}: AuthNavProps<"Home">) {
	const { user, setUser } = useContext(UserContext)!;
	const [precs, setPrecs] = useState<PrecType[]>([]);

	const handlePress = (id: string)=>{
		navigation.navigate('PrecForm', {precId: id})
	}

	useEffect(() => {
		console.log(user!.likedPrecs)
		fetch("http://34.64.175.123:4000/api/embed?q=저작권")
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setPrecs(res);
			});
	}, []);

	return (
		<View style={styles.container}>
			<Text style={{ alignSelf: "flex-start" }}>
				{user ? `환영합니다. ${user.username}` : null}
			</Text>
			{!user ? (
				<Button
					title="로그인"
					onPress={() => navigation.navigate("Login")}
					containerStyle={{ alignSelf: "flex-end" }}
				></Button>
			) : (
				<Button
					title="로그아웃"
					onPress={() => {
						setUser(null);
						navigation.goBack()
					}}
					containerStyle={{ alignSelf: "flex-end" }}
				></Button>
			)}
			<Image style={styles.tinyLogo} source={require("../assets/logo.PNG")} />
			<Text style={{paddingBottom: 20}}>머신러닝 기반 판례 검색 시스템</Text>
			<FlatList
				keyExtractor={(item) => item._id}
				data={precs}
				renderItem={({ item }) => (
					<Prec id={item._id} title={item.title} caseNum={item.caseNum} onPress={handlePress}/>
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
