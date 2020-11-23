import "./Main.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";

//textarea 입력 후 click -> go to search component

function Main() {
	const [textAreaContent, setTextAreaContent] = useState("");
	const history = useHistory();
	// console.log(textAreaContent);
	// console.log(useHistory)

	function handleOnChange(event) {
		setTextAreaContent(event.target.value);
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
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "flex-end",
					padding: "10px 10px"
				}}
			>
				<button className="btn btn-outline-secondary">로그인하기</button>

			</div>
			<div className="wrap">
				<div className="logo"></div>
				<div className="subtitle">
					<h6> 딥러닝 기반 판례 검색 시스템</h6>
				</div>
			</div>
			<div class="input-group">
				<textarea
					className="form-control"
					style={{ borderRadius: "20px" }}
					placeholder="사건을 입력하세요"
					value={textAreaContent}
					onChange={handleOnChange}
				></textarea>
				<div className="input-group-append">
					<button
						className="btn btn-outline-secondary"
						onClick={handleOnClick}
					>
						검색
					</button>
				</div>
			</div>
		</>
	);
}

export default Main;
