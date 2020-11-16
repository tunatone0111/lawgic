import "./Search.css";
import Logo from "../assets/logo.PNG";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Prec from "./Prec";

function Search() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const [content, setContent] = useState(query.get("query"));
	const [comments, setComments] = useState([]);
	const [precs, setPrecs] = useState([]);

	console.log(query.get("query"));

	function handleOnChange(event) {
		setContent(event.target.value);
	}

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
			.then((response) => response.json())
			.then((response) => {
				console.log(response);
				setComments(response);
			});

		fetch(encodeURI(`http://localhost:4000/api/embed?q=${query.get("query")}`))
			.then((res) => res.json())
			.then((res) => {
				console.log(res);
				setPrecs(res);
			});
	}, []);

	return (
		<div className="top">
			<div style={{ display: "flex", padding: "20px" }}>
				<img src={Logo} width="100px" style={{ marginRight: "20px" }} />
				<textarea
					className="form-control"
					style={{ borderRadius: "20px" }}
					placeholder="사건을 입력하세요"
					onChange={handleOnChange}
					value={content}
					aria-label="With textarea"
				></textarea>
				<div className="input-group-append">
					<button className="btn btn-outline-secondary" type="button">
						검색
					</button>
				</div>
			</div>

			<div style={{ marginTop: "20px" }}>
				<Prec
					title="손배배상청구의소 [서울고등법원
							2020.5.28.,선고,2018나2068927,판결:상고]"
					content="With supporting text below as a natural lead-in to additional
							content."
				/>
				<Prec title="hello" content="world" />
				<Prec title="hello" content="world" />
				<Prec title="hello" content="world" />
				<Prec title="hello" content="world" />
				{precs.map((prec) => (
					<Prec title={prec.caseNum} content={prec.title} />
				))}

				<div style={{ marginTop: "20px" }}>
					{comments.map((comment) => (
						<Prec title={comment.email} content={comment.body} />
					))}
				</div>
			</div>

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
