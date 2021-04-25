import { IconButton } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function BackButton() {
	const history = useHistory();
	return (
		<IconButton onClick={history.goBack}>
			<ArrowBackIcon />
		</IconButton>
	);
}

export default BackButton;
