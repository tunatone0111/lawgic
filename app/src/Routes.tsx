import React, { useState } from "react";
import { Text } from "react-native";
import {
	createStackNavigator,
	StackNavigationProp
} from "@react-navigation/stack";
import { NavigationContainer, RouteProp } from "@react-navigation/native";
import Landing from "./screens/Landing";
import PrecForm from "./screens/PrecForm";
import Login from "./screens/Login";
import { UserContext } from "./services/UserContext";
import { User } from "./services/authService";
import { Header } from "react-native-elements";

const Stack = createStackNavigator();

export default function Routes() {
	const [user, setUser] = useState<User | null>(null);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName="Landing"
					screenOptions={{
						headerTitle: (props) => (
							<Header
								leftComponent={{icon: 'menu', color:'#fff'}}
								centerComponent={{text: 'title', style:{color: '#fff'}}}
								rightComponent={{icon: 'home', color: '#fff'}}
							/>
						)
					}}
				>
					<Stack.Screen name="Landing" component={Landing} />
					<Stack.Screen name="PrecForm" component={PrecForm} />
					<Stack.Screen name="Login" component={Login} />
				</Stack.Navigator>
			</NavigationContainer>
		</UserContext.Provider>
	);
}

export type AuthParamList = {
	Landing: undefined;
	PrecForm: undefined;
	Login: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
	navigation: StackNavigationProp<AuthParamList, T>;
	route: RouteProp<AuthParamList, T>;
};
