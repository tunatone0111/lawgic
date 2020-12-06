import "../styles/Main.css";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";

function Main() {
	return (
		<div className="d-flex flex-column mx-auto" style={{ maxWidth: "75vw" }}>
			<div className="d-flex justify-content-end m-3">
				<Link to="/login" className="btn btn-outline-secondary">
					로그인하기
				</Link>
			</div>
			<div
				className="d-flex justify-content-center mr-5 ml-5"
				style={{ marginTop: 100 }}
			>
				<Logo />
			</div>
			<div className="d-flex justify-content-center">
				머신러닝 기반 판례 검색 시스템
			</div>
			<div className="d-flex justify-content-center mt-5">
				<SearchBox />
			</div>
		</div>
	);
}

export default Main;
