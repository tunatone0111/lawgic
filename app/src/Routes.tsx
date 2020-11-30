import React, { useState } from "react";
import { Text } from "react-native";
import {
	createStackNavigator,
	StackNavigationProp
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import Home from "./screens/Home";
import PrecForm from "./screens/PrecForm";
import Login from "./screens/Login";
import { UserContext } from "./services/UserContext";
import { User } from "./services/authService";

const Stack = createStackNavigator();

export default function Routes() {
	const [user, setUser] = useState<User | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
					<Stack.Screen name="Login" component={Login} />
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="PrecForm" component={PrecForm} options={{headerShown: true}}/>
				</Stack.Navigator>
			</NavigationContainer>
		</UserContext.Provider>
	);
}

export type AuthParamList = {
	Home: undefined;
	PrecForm: {precId: string};
	Login: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
	navigation: StackNavigationProp<AuthParamList, T>;
	route: RouteProp<AuthParamList, T>;
};
