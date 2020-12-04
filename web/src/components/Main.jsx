import "./Main.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
	InputGroup,
	FormControl,
	Button,
	Container,
	Row
} from "react-bootstrap";
import Logo from "./Logo";
import SearchBox from "./SearchBox";

//textarea 입력 후 click -> go to search component

function Main() {
	const [textAreaContent, setTextAreaContent] = useState("");
	const history = useHistory();
	const [autoCompletes, setAutoCompletes] = useState([]);
	// console.log(textAreaContent);
	// console.log(useHistory)

	// window.onkeyup = (e) => {
	// 	if (e.key == "Process" && e.code == "Space") {
	// 		autoCompletes &&
	// 			autoCompletes[0] &&
	// 			setTextAreaContent(
	// 				`${textAreaContent.substring(0, textAreaContent.lastIndexOf(" "))}${
	// 					autoCompletes[0]
	// 				}`
	// 			);
	// 	}
	// };

	/*function openclose() {
            let status = $('#').css('display');
            if (status == '') {
                $('#').hide()
                $('#').text('로그인 창 열기')
            } else {
                $('#').show()
                $('#').text('로그인 창 닫기')
            }
        }*/

	return (
		<div className="d-flex flex-column mx-auto" style={{ maxWidth: "75vw" }}>
			<div className="d-flex justify-content-end m-3">
				<Button variant="outline-secondary">로그인하기</Button>
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
