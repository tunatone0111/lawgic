import {
	Button,
	Checkbox,
	Container,
	FormControlLabel,
	Grid,
	LinearProgress,
	makeStyles,
	Slider,
	TablePagination,
	Typography,
} from "@material-ui/core";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import useSwr from "swr";
import Navbar from "../components/Navbar";
import Prec from "../components/Prec";
import Report from "../components/Report";
import fetcher from "../services/fetcher";

const useStyles = makeStyles((theme) => ({
	loading: {
		position: "absolute",
		top: 0,
	},
	textCentering: {
		textAlign: "center",
	},
	slider: {
		marginTop: theme.spacing(5),
	},
}));

function Search() {
	const classes = useStyles();
	const history = useHistory();
	const yearLimit = [1970, new Date().getFullYear()];
	const query = new URLSearchParams(useLocation().search);
	const { data, error } = useSwr(
		`${process.env.REACT_APP_API_URL}/api/search?query=${query.get(
			"query"
		)}&type=${query.get("type")}`,
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
	const [onlySupreme, setOnlySupreme] = useState(false);
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
				...precs
					.filter((p: PrecPreview) =>
						onlySupreme ? p.court.code === 400201 : true
					)
					.filter((p: PrecPreview) => {
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

	if (error) history.push("/error");

	return (
		<>
			{!data ? (
				<LinearProgress className={classes.loading} />
			) : (
				<Container component="section">
					<Grid container spacing={2}>
						<Grid item xs={2}>
							<Slider
								value={yearRange}
								onChange={handleChangeYearRange}
								valueLabelDisplay="on"
								min={yearLimit[0]}
								max={yearLimit[1]}
								className={classes.slider}
							/>
							<FormControlLabel
								control={
									<Checkbox
										color="primary"
										value={onlySupreme}
										onChange={(e) => setOnlySupreme(e.target.checked)}
									/>
								}
								label="대법원판례만 보기"
							/>
							<Button variant="contained" onClick={filterPrecs}>
								필터 적용
							</Button>
						</Grid>
						<Grid item xs={10}>
							<TablePagination
								component="div"
								count={filteredPrecs.length}
								page={page}
								onChangePage={handleChangePage}
								rowsPerPage={rowsPerPage}
								onChangeRowsPerPage={handleChangeRowsPerPage}
								labelRowsPerPage="테이블 당 표시할 항목 수"
							/>
							{pagedPrecs.length === 0 ? (
								<Typography
									variant="h5"
									component="span"
									className={classes.textCentering}
								>
									검색된 판례가 없습니다.
								</Typography>
							) : (
								pagedPrecs.map((prec, idx) => <Prec key={idx} prec={prec} />)
							)}
						</Grid>
					</Grid>
					<Report />
				</Container>
			)}
		</>
	);
}

export default Search;
