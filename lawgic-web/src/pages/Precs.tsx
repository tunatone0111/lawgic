import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/common/BackButton";
const useStyles = makeStyles((theme) => ({
	iframe: {
		width: "100%",
		height: "90vh",
	},
}));

function Precs() {
	const classes = useStyles();
	const { id } = useParams<{ id: string }>();
	return (
		<Grid container>
			<Grid item xs={1}>
				<BackButton />
			</Grid>
			<Grid item xs={10}>
				<iframe
					className={classes.iframe}
					src={`https://www.law.go.kr/LSW/precInfoP.do?precSeq=${id}&mode=0#AJAX`}
				></iframe>
			</Grid>
		</Grid>
	);
}

export default Precs;
