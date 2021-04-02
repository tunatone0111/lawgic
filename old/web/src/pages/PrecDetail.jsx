// import "./PrecDetail.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
	Box,
	Button,
	Container,
	makeStyles,
	Typography,
} from "@material-ui/core";
import config from "../config";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		justifyContent: "flex-end",
	},
	goBackBtn: {
		marginBottom: theme.spacing(2),
	},
	issues: {
		marginTop: theme.spacing(2),
	},
	wholePrec: {
		marginTop: theme.spacing(2),
	},
}));

function PrecDetail({ history }) {
	const classes = useStyles();
	const params = useParams();
	const id = params.id;
	const [result, setResult] = useState(null);

	useEffect(async () => {
		fetch(`${config.base_url}/api/precs/${id}`)
			.then((res) => res.json())
			.then((res) => setResult(res));
	}, []);

	// useEffect(()=>{
	// 	document.querySelectorAll('#whole-prec a').forEach((elem)=>{
	// 		elem.addEventListener('click', (e)=>{e.preventDefault()})
	// 	})
	// }, [])

	if (result === null) return <div>loading...</div>;

	return (
		<Container maxWidth="md">
			<Box component="section" className={classes.root}>
				<Button
					onClick={history.goBack}
					variant="outlined"
					className={classes.goBackBtn}
				>
					뒤로가기
				</Button>
			</Box>
			<Box component="section">
				<Typography variant="h5" component="h2">
					{result.title}
				</Typography>
				<Typography variant="h6" component="h3" className={classes.issues}>
					【판시사항】
				</Typography>
				{result.issues.map((issue, idx) => (
					<Typography key={idx}>
						[{idx + 1}] {issue}
					</Typography>
				))}
				<Box
					id="whole-prec"
					component="article"
					className={classes.wholePrec}
					dangerouslySetInnerHTML={{ __html: result.wholePrec }}
				></Box>
			</Box>
		</Container>
	);
}

export default PrecDetail;
