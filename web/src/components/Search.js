import "./Search.css";
import Logo from "../assets/logo.PNG";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Prec from "./Prec";
import Pagination from "./Pagination";

function Search() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const [content, setContent] = useState(query.get("query"));
	const [precs, setPrecs] = useState([]);
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	const q = query.get("query");

	function handleOnChange(event) {
		setContent(event.target.value);
	}

	function handleOnClick() {
		history.push(`/search?query=${content}`);
		//Search();
	}

	useEffect(() => {
		fetch(encodeURI(`http://34.64.175.123:4000/api/embed?q=${q}`))
			.then((res) => res.json())
			.then((res) => {
				setPrecs(res);
				setLoading(false);
			});
	}, [q]);
	if (loading) return <div>loading...</div>;

	return (
		<div className="top">
			<div style={{ display: "flex", padding: "20px" }}>
				<a href="/">
					<img src={Logo} width="100px" style={{ marginRight: "20px" }} />
				</a>
				<input
					type="text"
					className="form-control"
					style={{ borderRadius: "20px" }}
					placeholder="사건을 입력하세요"
					onChange={handleOnChange}
					value={content}
					aria-label="With textarea"
				></input>
				<div className="input-group-append">
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={handleOnClick}
					>
						검색
					</button>
				</div>
			</div>

			<div style={{ marginTop: "20px" }}></div>
			{precs.map((prec) => (
				<Prec
					id={prec._id}
					caseNum={prec.caseNum}
					title={prec.title}
					issues={prec.issues}
				/>
			))}

			<Pagination />
		</div>
	);
}

export default Search;
