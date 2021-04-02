import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Typography,
	makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import React from "react";

type PrecProps = {
	prec: PrecPreview;
};

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(2),
	},
}));

function Prec({ prec }: PrecProps) {
	const classes = useStyles();
	return (
		<Card className={classes.root} elevation={3}>
			<CardHeader
				title={<Typography variant="h6">{prec.title}</Typography>}
				subheader={`${prec.date.toLocaleDateString("ko")} [${
					prec.caseNum
				}] 피참조횟수: ${prec.citationCount}`}
			/>
			<CardContent>
				{prec.issues &&
					prec.issues.map((i, idx) => (
						<Typography key={idx}>{`[${idx + 1}] ${i.text}`}</Typography>
					))}
			</CardContent>
			<CardActions style={{ justifyContent: "flex-end" }}>
				<Button
					color="primary"
					variant="contained"
					component={Link}
					to={`/precs/${prec.precId}`}
				>
					상세보기
				</Button>
			</CardActions>
		</Card>
	);
}

export default Prec;
