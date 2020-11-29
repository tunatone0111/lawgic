import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import Landing from "./screens/Landing";
import PrecForm from "./screens/PrecForm";
import Login from './screens/Login';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Landing">
				<Stack.Screen name="Login" component={Login}/>
				<Stack.Screen name="Landing" component={Landing}/>
				<Stack.Screen name="PrecForm" component={PrecForm}/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export type AuthParamList = {
  Landing: undefined,
	PrecForm: undefined,
	Login: undefined,
}

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>
  route: RouteProp<AuthParamList, T>
}