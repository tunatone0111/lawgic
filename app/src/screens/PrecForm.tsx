import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthNavProps } from "../Routes";

export default function PrecForm({
	navigation,
	route
}: AuthNavProps<"PrecForm">) {
	const { precId } = route.params;
	const [prec, setPrec] = useState(null);

	useEffect(() => {
		fetch(`http://34.64.175.123:4000/api/precs/${precId}`)
			.then((res) => res.json())
			.then((res) => {
        setPrec(res);
			});
	}, [precId]);

	return (
		<View>
			{!prec ? (
				<Text>Loading...</Text>
			) : (
				<>
					<Text>{prec.title}</Text>
					<Text>{prec.caseNum}</Text>
					<Text>{prec.issues}</Text>
					<Text>{prec.wholePrec}</Text>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({});
