import React from "react";
import Logo from "./Logo";
import SearchBox from "./SearchBox";

export default function MyNavbar() {
	return (
		<div
			className="d-flex justify-content-between shadow sticky-top"
			style={{
				padding: "10px 20vw 10px 20vw",
				marginBottom: 50,
				backgroundColor: "white",
				gridTemplateColumns: "2fr 1fr"
			}}
		>
			<Logo width="100px" />
			<SearchBox />
		</div>
	);
}
