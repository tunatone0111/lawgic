import React from "react";
import { useParams } from "react-router-dom";

function Precs() {
	const { id } = useParams<{ id: string }>();
	return <div>prec id: {id}</div>;
}

export default Precs;
