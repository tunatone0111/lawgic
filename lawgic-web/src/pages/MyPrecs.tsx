import React, { useContext } from "react";
import LikedContext from "../services/LikedContext";
import Prec from "../components/Prec";

function MyPrecs() {
	const { likedPrecs } = useContext(LikedContext);
	// return likedPrecs.map((prec, idx) => <Prec key={idx} prec={prec} />);
	return <div>a</div>;
}

export default MyPrecs;
