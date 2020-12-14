import "../styles/Search.css";
import { useLocation } from "react-router-dom";
import { Spinner, Container, Row } from "react-bootstrap";
import Prec from "../components/Prec";
import useFetch from "../services/useFetch";
import config from "../config";

function Search() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const q = query.get("query");

	const { data: precs, eTime } = useFetch(
		encodeURI(`${config.base_url}/api/embed?q=${q}`)
	);

	return (
		<Container style={{ maxWidth: "60vw" }}>
			{!precs ? (
				<Spinner
					animation="border"
					variant="warning"
					style={{ position: "absolute", left: "50%", top: "50%" }}
				/>
			) : (
				<>
					<Row>
						<h4>검색결과: {precs.length} 건</h4>
					</Row>
					<Row>
						<p>(소요시간: {eTime}ms)</p>
					</Row>
					{precs.map((prec) => (
						<Prec key={prec.precId} prec={prec} />
					))}
				</>
			)}
		</Container>
	);
}

export default Search;
