import {
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	Slider,
	Typography,
	makeStyles,
	TablePagination,
} from "@material-ui/core";
import React, {
	useCallback,
	useState,
	useEffect,
	ChangeEventHandler,
} from "react";
import { useLocation } from "react-router";
import useSwr from "swr";
import Navbar from "../components/Navbar";
import Prec from "../components/Prec";
import fetcher, { mockFetcher } from "../services/fetcher";
import _ from "lodash";

const useStyles = makeStyles((theme) => ({
	slider: {
		marginTop: theme.spacing(5),
	},
}));

function Search() {
	const classes = useStyles();
	const yearLimit = [1970, new Date().getFullYear()];
	const query = new URLSearchParams(useLocation().search);
	const { data, error } = useSwr(
		`http://localhost:5000/api/search?query=${query.get("query")}`,
		async (url) => {
			const res = await fetcher(url);
			return {
				...res,
				precs: res.precs.map((p: any) => ({ ...p, date: new Date(p.date) })),
			};
		}
	);

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [yearRange, setYearRange] = useState([2000, 2020]);
	const [filteredPrecs, setFilteredPrecs] = useState<PrecPreview[]>([]);
	const [pagedPrecs, setPagedPrecs] = useState<PrecPreview[]>([]);

	const handleChangeYearRange = (event: any, newValue: number | number[]) => {
		setYearRange(newValue as number[]);
	};

	const handleChangePage = (
		event: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const filterPrecs = () => {
		if (data) {
			const { precs } = data;
			setFilteredPrecs([
				...precs.filter((p: any) => {
					let [s, e] = yearRange;
					if (s === yearLimit[0]) s = 0;
					return _.inRange(p.date.getFullYear(), s, e + 1);
				}),
			]);
			setPage(0);
		}
	};

	const paginatePrecs = () => {
		setPagedPrecs([
			..._.slice(filteredPrecs, rowsPerPage * page, rowsPerPage * (page + 1)),
		]);
	};

	useEffect(filterPrecs, [data]);
	useEffect(paginatePrecs, [filteredPrecs, rowsPerPage, page]);

	if (error) return <div>failed to load</div>;
	if (!data) return <div>loading...</div>;

	return (
		<>
			<Navbar />
			<Container component="section">
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<Grid container direction="column">
							<Grid item>
								<Slider
									value={yearRange}
									onChange={handleChangeYearRange}
									valueLabelDisplay="on"
									min={yearLimit[0]}
									max={yearLimit[1]}
									className={classes.slider}
								/>
							</Grid>
							<Grid item>
								<FormControlLabel
									control={<Checkbox color="primary" />}
									label="대법원판례만 보기"
								/>
							</Grid>
							<Grid item>
								<Button variant="contained" onClick={filterPrecs}>
									Apply
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={10}>
						<TablePagination
							component="div"
							count={filteredPrecs.length}
							page={page}
							onChangePage={handleChangePage}
							rowsPerPage={rowsPerPage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
						{pagedPrecs.map((prec, idx) => (
							<Prec key={idx} prec={prec} />
						))}
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

export default Search;
