import "./Main.css";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
	InputGroup,
	FormControl,
	Button,
	Container,
	Row,
	ListGroup
} from "react-bootstrap";
import Logo from "./Logo";

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

	function handleOnChange(event) {
		setTextAreaContent(event.target.value);
		fetch(`http://34.64.175.123:4000/api/terms?q=${event.target.value}`)
			.then((res) => res.json())
			.then((res) => setAutoCompletes(res));
	}

	function handleOnClick() {
		history.push("/search?query=" + textAreaContent);
	}

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
		<Container>
			<Row className="justify-content-end m-3">
				<Button variant="outline-secondary">로그인하기</Button>
			</Row>
			<Row
				className="justify-content-center mr-5 ml-5"
				style={{ marginTop: 100 }}
			>
				<a onClick={() => history.push("/")}>
					<Logo />
					<div>
						<p className="text-center" style={{ fontSize: "1vw" }}>
							머신러닝 기반 판례 검색 시스템
						</p>
					</div>
				</a>
			</Row>
			<Row className="m-3 justify-content-center">
				<InputGroup>
					<FormControl
						as="textarea"
						id="text-input-box"
						placeholder="사건을 입력하세요"
						value={textAreaContent}
						onChange={handleOnChange}
						style={{ borderRadius: "20px 0 0 20px" }}
					/>
					<Button
						variant="secondary"
						onClick={handleOnClick}
						style={{ borderRadius: "0 20px 20px 0" }}
					>
						검색
					</Button>
				</InputGroup>
			</Row>
			<ListGroup className="ml-5 mr-5">
				{autoCompletes.map((w, idx) => (
					<ListGroup.Item key={idx} className={`auto-${idx}`}>
						{w}
					</ListGroup.Item>
				))}
			</ListGroup>
		</Container>
	);
}

export default Main;
