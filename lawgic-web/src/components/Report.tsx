import { makeStyles, Fab } from "@material-ui/core";
import ReportIcon from "@material-ui/icons/ReportProblem";
import EditIcon from "@material-ui/icons/Edit";
import React from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		position: "fixed",
		bottom: 20,
		right: 20,
	},
}));

function Report() {
	const classes = useStyles();
	return (
		<Fab
			variant="extended"
			color="primary"
			aria-label="report"
			className={classes.root}
			href="https://forms.gle/QwktDw71Crst41n98"
			target="_blank"
		>
			<EditIcon />
			설문조사 진행 중
		</Fab>
	);
}

export default Report;
