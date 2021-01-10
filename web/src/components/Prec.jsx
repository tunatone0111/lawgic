import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Checkbox,
	Chip,
	LinearProgress,
	makeStyles,
	Typography,
	withStyles,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import axios from "axios";
import React, { useCallback, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import config from "../config";
import { UserContext } from "../services/UserContext";

const useStyles = makeStyles((theme) => ({
	root: {
		marginBottom: theme.spacing(2),
	},
}));

const CustomProgress = withStyles((theme) => ({
	root: {
		height: 10,
	},
	colorPrimary: {
		backgroundColor: theme.palette.success[50],
	},
	bar: {
		backgroundColor: theme.palette.success[200],
		borderRadius: 5,
	},
}))(LinearProgress);

const orderBadges = [
	null,
	<Chip size="small" label="1심" />,
	<Chip size="small" label="2심" />,
	<Chip color="primary" size="small" label="대법원" />,
];
const enBanc = <Chip color="primary" size="small" label="합의체" />;

// function simcolor(sim) {
// 	if (sim >= 0.7) {
// 		return "lemonchiffon";
// 	} else if (sim >= 0.55) {
// 		return "lightgoldenrodyellow";
// 	} else {
// 		return "beige";
// 	}
// }

function Prec({ prec }) {
	const classes = useStyles();
	const { user, setUser } = useContext(UserContext);
	const [liked, setLiked] = useState(
		user && user.likedPrecs.filter((i) => i === prec.precId).length !== 0
	);
	const history = useHistory();

	const toggleLike = useCallback(() => {
		const newLiked = !liked;
		setLiked(newLiked);
		if (newLiked === true) {
			axios
				.put(
					`${config.base_url}/api/precs/my`,
					{ precId: prec.precId },
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				)
				.then(() => {
					const { likedPrecs: newLikedPrecs } = user;
					newLikedPrecs.push(prec.precId);
					setUser({ ...user, likedPrecs: newLikedPrecs });
				})
				.catch(() => {
					alert("something failed");
					setLiked(!newLiked);
				});
		} else {
			axios
				.delete(`${config.base_url}/api/precs/my/${prec.precId}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem("token")}`,
					},
				})
				.then(() => {
					const { likedPrecs: newLikedPrecs } = user;
					setUser({
						...user,
						likedPrecs: newLikedPrecs.filter((p) => p !== prec.precId),
					});
				})
				.catch(() => {
					alert("something failed");
					setLiked(!newLiked);
				});
		}
	}, [liked, prec.precId, setUser, user]);

	return (
		<Card className={classes.root} elevation={3}>
			<CustomProgress variant="determinate" value={prec.sim * 100} />
			<CardHeader
				title={
					<Typography variant="h6">
						{prec.title} {orderBadges[prec.courtOrder]}{" "}
						{prec.isEnBanc ? enBanc : null}
					</Typography>
				}
				subheader={`${prec.date.slice(0, 10)} [${prec.caseNum}] 피참조횟수: ${
					prec.citationCount
				}`}
			/>
			<CardContent>
				{prec.issues &&
					prec.issues.map((i, idx) => (
						<Typography key={idx}>{`[${idx + 1}] ${i}`}</Typography>
					))}
			</CardContent>
			<CardActions style={{ justifyContent: "flex-end" }}>
				<Checkbox
					edge="start"
					icon={<FavoriteIcon />}
					checkedIcon={<FavoriteBorderIcon />}
					checked={liked}
					onClick={toggleLike}
				/>
				<Button
					color="primary"
					variant="contained"
					onClick={() => history.push("/precs/" + prec.precId)}
				>
					상세보기
				</Button>
			</CardActions>
		</Card>
	);
}

export default Prec;
