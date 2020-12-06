import "./Search.css";
import { useHistory, useLocation } from "react-router-dom";
import { Spinner, Container, Row } from "react-bootstrap";
import Prec from "./Prec";
import useFetch from "../services/useFetch";

function Search() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const q = query.get("query");

	const { data: precs, loading, eTime } = useFetch(
		encodeURI(`http://34.64.175.123:4000/api/embed?q=${q}`)
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
					{precs.map((prec) => {
						console.log(prec);
						return <Prec key={prec.precId} prec={prec} />;
					})}
				</>
			)}
		</Container>
	);
}

export default Search;
