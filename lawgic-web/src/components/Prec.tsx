import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Checkbox,
	LinearProgress,
	makeStyles,
	Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import LikedContext from "../services/LikedContext";

type PrecProps = {
	prec: PrecPreview;
};

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(2),
	},
	text: {
		marginBottom: theme.spacing(1),
	},
}));

function Prec({ prec }: PrecProps) {
	const classes = useStyles();
	const { likedPrecs, addPrec, delPrec } = useContext(LikedContext);
	const [liked, setLiked] = useState(false);
	const [liking, setLiking] = useState(false);

	const toggleLike = () => {
		setLiking(true);
		const old = liked;
		setLiked(!old);
		if (!old) {
			addPrec(prec.precId);
		} else {
			delPrec(prec.precId);
		}
		setLiking(false);
	};

	return (
		<Card className={classes.root} elevation={3}>
			<LinearProgress variant="determinate" value={prec.sim * 100} />
			<CardHeader
				title={<Typography variant="h6">{prec.title}</Typography>}
				subheader={`${prec.date.toLocaleDateString("ko")} [${prec.caseNum}]`}
			/>
			<CardContent>
				{prec.issues &&
					prec.issues.map((i, idx) => (
						<Typography key={idx} className={classes.text}>{`[${idx + 1}] ${
							i.text
						}`}</Typography>
					))}
			</CardContent>
			<CardActions style={{ justifyContent: "flex-end" }}>
				{/* <Checkbox
					disabled={liking}
					edge="start"
					icon={<FavoriteBorderIcon />}
					checkedIcon={<FavoriteIcon />}
					checked={liked}
					onClick={toggleLike}
				/> */}
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
