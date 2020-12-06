// import "./PrecDetail.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Container } from "react-bootstrap";

//import Prec from "./Prec";

function PrecDetail({ history }) {
	const params = useParams();
	const id = params.id;
	const [result, setResult] = useState(null);

	useEffect(async () => {
		fetch(`http://34.64.175.123:4000/api/precs/${id}`)
			.then((res) => res.json())
			.then((res) => setResult(res));
	}, []);

	if (result === null) return <div>loading...</div>;

	return (
		<Container style={{ maxWidth: "60vw" }}>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					padding: "10px 10px"
				}}
			>
				<Button onClick={history.goBack} variant="outline-warning">
					뒤로가기
				</Button>
			</div>
			<div className="body">
				<h2 className="mb-3 ml-4">{result.title}</h2>
				<div className="m-4">
					<h3>판시사항</h3>
					{result.issues}
				</div>
				<div
					className="m-4"
					dangerouslySetInnerHTML={{ __html: result.wholePrec }}
				></div>
			</div>
		</Container>
	);
}

export default PrecDetail;
