import "./Search.css";
import Logo from "../assets/logo.PNG";
import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Prec from "./Prec";

function Search() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const [content, setContent] = useState(query.get("query"));
	const [precs, setPrecs] = useState([]);
	const history = useHistory();
	const [loading, setLoading] = useState(true);
	function handleOnChange(event) {
		setContent(event.target.value);
	}

	function handleOnClick() {
		history.push(`/search?query=${content}`);
	}

	useEffect(() => {
		fetch(encodeURI(`http://localhost:4000/api/embed?q=${query.get("query")}`))
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setPrecs(res);
				setLoading(false);
			});
	}, []);
	//if (loading) return <div>loading...</div>;

	return (
		<div className="top">
			<div style={{ display: "flex", padding: "20px" }}>
				<a href="/">
					<img src={Logo} width="100px" style={{ marginRight: "20px" }} />
				</a>
				<textarea
					className="form-control"
					style={{ borderRadius: "20px" }}
					placeholder="사건을 입력하세요"
					onChange={handleOnChange}
					value={content}
					aria-label="With textarea"
				></textarea>
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
					key={prec.caseNum}
					caseNum={prec.caseNum}
					title={prec.title}
					issues={prec.issues}
					onClick={() => history.push("/precs/${prec.caseNum}")}
				/>
			))}

			<nav aria-label="Page navigation example">
				<ul className="pagination">
					<li className="page-item">
						<a className="page-link" href="#" aria-label="Previous">
							<span aria-hidden="true">&laquo;</span>
							<span className="sr-only">Previous</span>
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="#">
							1
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="#">
							2
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="#">
							3
						</a>
					</li>
					<li className="page-item">
						<a className="page-link" href="#" aria-label="Next">
							<span aria-hidden="true">&raquo;</span>
							<span className="sr-only">Next</span>
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Search;
