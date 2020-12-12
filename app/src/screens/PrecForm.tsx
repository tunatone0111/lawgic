import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { AuthNavProps } from "../Routes";
import { PrecType } from "../services/precsService";
import HTML from "react-native-render-html";

export default function PrecForm({
	navigation,
	route
}: AuthNavProps<"PrecForm">) {
	const { precId } = route.params;
	const [prec, setPrec] = useState<PrecType | undefined>(undefined);

	useEffect(() => {
		fetch(`http://34.64.175.123:4000/api/precs/${precId}`)
			.then((res) => res.json())
			.then((res) => {
				setPrec(res);
			});
	}, [precId]);

	return (
		<View style={styles.container}>
			{!prec ? (
				<Text>Loading...</Text>
			) : (
				<>
					<Text h2>{prec.title}</Text>
					<Text h3>{prec.caseNum}</Text>
					<Text>{prec.issues}</Text>
					<HTML html={prec.wholePrec} />
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10
	}
});
