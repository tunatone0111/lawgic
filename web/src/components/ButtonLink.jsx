import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

function ButtonLink({ children, ...props }) {
	return (
		<Button component={Link} {...props}>
			{children}
		</Button>
	);
}

export default ButtonLink;
