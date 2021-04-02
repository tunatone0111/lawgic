import {
	Container,
	Typography,
	makeStyles,
	CircularProgress,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import Prec from "../components/Prec";
import useFetch from "../services/useFetch";
import config from "../config";

const useStyles = makeStyles((theme) => ({
	spacer: {
		marginBottom: theme.spacing(2),
	},
	loading: {
		position: 'absolute',
		left: '50%',
		top: '50%',
		transform: 'translation(50%, 50%)'
	}
}));

function Search() {
	const classes = useStyles();
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const q = query.get("query");

	let { data: precs, eTime } = useFetch(
		encodeURI(`${config.base_url}/api/embed?q=${q}`)
	);

	// eTime=100

	// precs = [
	// 	{
	// 		precId: 'precId',
	// 		date: '2021-01-01',
	// 		title: '보석취소 결정에 대한 재항고',
	// 		caseNum: '2018나합000000',
	// 		issues: [],
	// 		courtOrder: 1,
	// 		isEnBanc: true,
	// 		citationCount: 3,
	// 		sim: 0.9,
	// 	},
	// 	{
	// 		precId: 'precId',
	// 		date: '2021-01-01',
	// 		title: '보석취소 결정에 대한 재항고',
	// 		caseNum: 'caseNum',
	// 		issues: ['어쩌구'],
	// 		courtOrder: 2,
	// 		isEnBanc: true,
	// 		citationCount: 3,
	// 		sim: 0.7,
	// 	},
	// 	{
	// 		precId: 'precId',
	// 		date: '2021-01-01',
	// 		title: '도로교통법위반(음주측정거부)[개정된 도로교통법 시행 이전 전과를 포함하는 것이 형벌불소급의 원칙에 위반되는지 여부]',
	// 		caseNum: 'caseNum',
	// 		issues: ['어쩌구'],
	// 		courtOrder: 2,
	// 		isEnBanc: true,
	// 		citationCount: 3,
	// 		sim: 0.7,
	// 	},
	// 	{
	// 		precId: 'precId',
	// 		date: '2021-01-01',
	// 		title: 'title',
	// 		caseNum: 'caseNum',
	// 		issues: ['어쩌구'],
	// 		courtOrder: 2,
	// 		isEnBanc: true,
	// 		citationCount: 3,
	// 		sim: 0.7,
	// 	},
	// 	{
	// 		precId: 'precId',
	// 		date: '2021-01-01',
	// 		title: 'title',
	// 		caseNum: 'caseNum',
	// 		issues: ['어쩌구'],
	// 		courtOrder: 2,
	// 		isEnBanc: true,
	// 		citationCount: 3,
	// 		sim: 0.7,
	// 	},
	// 	{
	// 		precId: 'precId',
	// 		date: '2021-01-01',
	// 		title: 'title',
	// 		caseNum: 'caseNum',
	// 		issues: ['어쩌구'],
	// 		courtOrder: 2,
	// 		isEnBanc: true,
	// 		citationCount: 3,
	// 		sim: 0.7,
	// 	},
	// 	{
	// 		precId: 'precId',
	// 		date: '2021-01-01',
	// 		title: 'title',
	// 		caseNum: 'caseNum',
	// 		issues: [],
	// 		courtOrder: 3,
	// 		isEnBanc: false,
	// 		citationCount: 12,
	// 		sim: 0.5,
	// 	}
	// ]

	return (
		<Container component="section">
			{precs ? (
				<>
					<Typography variant="h6" component="p">
						검색결과: {precs.length} 건{" "}
					</Typography>
					<Typography className={classes.spacer}>
						(소요시간: {eTime}ms){" "}
					</Typography>
					{precs.map((prec) => (
						<Prec key={prec.precId} prec={prec} />
					))}
				</>
			) : (
				<CircularProgress color="primary" className={classes.loading} />
			)}
		</Container>
	);
}

export default Search;
