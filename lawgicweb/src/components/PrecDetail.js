import "./PrecDetail.css";
import Logo from "../assets/logo.PNG";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//import Prec from "./Prec";

function PrecDetail() {
	const params = useParams();
	const id = params.id;
	const [result, setResult] = useState(null);

	useEffect(() => {
		//fetch('/precs/' + id)
		setResult({ title: "poo", content: "bar" });
	}, []);

	if (result === null) return <div>loading...</div>;

	return (
		<div>
			<div>Title: {result.title}</div>
			<div>Content: {result.content}</div>
		</div>
	);
}

export default PrecDetail;
