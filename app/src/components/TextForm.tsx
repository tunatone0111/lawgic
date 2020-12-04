import React from "react";
import { View, Text } from "react-native";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Control, Controller, FieldError } from "react-hook-form";
import { FormData } from "../screens/Register";

export interface TextFormProp {
	control: Control<Partial<FormData>>;
	error: FieldError | undefined;
	name: Partial<keyof FormData>;
	label?: string;
	icon: string;
	isSecure?: boolean;
}

const TextForm = ({
	control,
	error,
	name,
	label,
	icon,
	isSecure
}: TextFormProp) => {
	return (
		<>
			<Controller
				control={control}
				render={({ onChange, onBlur, value }) => (
					<Input
						placeholder={label ? label : name}
						onBlur={onBlur}
						onChangeText={(value) => onChange(value)}
						value={value}
						secureTextEntry={isSecure ? isSecure : false}
						leftIcon={<Icon name={icon} size={24} color="gray" />}
					/>
				)}
				name={name}
				rules={{ required: true }}
				defaultValue=""
			/>
			{error && <Text>This is required.</Text>}
		</>
	);
};

export default TextForm;
