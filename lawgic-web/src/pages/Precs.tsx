import { Grid, makeStyles, Container, Button } from "@material-ui/core";
import React from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import Report from "../components/Report";
const useStyles = makeStyles((theme) => ({
	iframe: {
		width: "100%",
		height: "85vh",
	},
	box: {
		marginTop: theme.spacing(2),
	},
}));

function Precs() {
	const classes = useStyles();
	const history = useHistory();
	const { id } = useParams<{ id: string }>();
	return (
		<Container>
			<iframe
				className={classes.iframe}
				src={`https://www.law.go.kr/LSW/precInfoP.do?precSeq=${id}&mode=0#AJAX`}
			></iframe>
			<Grid container justify="flex-end" className={classes.box}>
				<Grid item>
					<Button variant="contained" onClick={history.goBack}>
						목록으로 돌아가기
					</Button>
				</Grid>
			</Grid>
			<Report />
		</Container>
	);
}

export default Precs;
