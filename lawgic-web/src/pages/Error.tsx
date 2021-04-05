import React from "react";
import {
	Box,
	Container,
	Grid,
	makeStyles,
	Typography,
	Button,
} from "@material-ui/core";
import Logo from "../components/Logo";

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: theme.spacing(5),
	},
}));

function Error() {
	const classes = useStyles();
	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justify="center"
			className={classes.root}
			spacing={2}
		>
			<Grid item>
				<Box width="150px" height="100px">
					<Logo />
				</Box>
			</Grid>
			<Grid item>
				<Typography variant="h5" component="h2">
					서버에 알 수 없는 오류가 발생하였습니다.
				</Typography>
				<Typography variant="h6" component="h4">
					서비스 이용에 불편을 끼쳐드려 죄송합니다.
				</Typography>
				<p>다음 링크를 클릭하시면 다른 사이트로 이동합니다.</p>
			</Grid>
			<Grid item>
				<Button href="https://law.go.kr" variant="contained">
					국가법령정보센터
				</Button>
			</Grid>
			<Grid item>
				<Button href="/" variant="contained" color="primary">
					로직 홈으로
				</Button>
			</Grid>
		</Grid>
	);
}

export default Error;
