import { Container } from "@material-ui/core";
import "../styles/Search.css";
import { useLocation } from "react-router-dom";
import Prec from "../components/Prec";
import useFetch from "../services/useFetch";
import config from "../config";

function Search() {
	const location = useLocation();
	const query = new URLSearchParams(location.search);
	const q = query.get("query");

	let { data: precs, eTime } = useFetch(
		encodeURI(`${config.base_url}/api/embed?q=${q}`)
	);

	eTime=100

	precs = [
		{
			title: '가나다'
		}
	]

	return (
		<Container>
			<h4>검색결과: {precs.length} 건</h4>
			<p>(소요시간: {eTime}ms)</p>
			{/* {precs.map((prec) => (
				<Prec key={prec.precId} prec={prec} />
			))} */}
		</Container>
	);
}

export default Search;
