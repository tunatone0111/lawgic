import React from "react";
import { TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";

export default function Prec({ id, title, caseNum, onPress }: PrecProps) {
	return (
		<TouchableOpacity onPress={() => onPress(id)}>
			<ListItem bottomDivider>
				<ListItem.Content>
					<ListItem.Title>{title}</ListItem.Title>
					<ListItem.Subtitle>{caseNum}</ListItem.Subtitle>
				</ListItem.Content>
			</ListItem>
		</TouchableOpacity>
	);
}

export interface PrecProps {
	id: string;
	title: string;
	caseNum: string;
	onPress: (id: string) => any;
}
