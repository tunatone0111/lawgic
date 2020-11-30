// import "./PrecDetail.css";
import Logo from "../assets/logo.PNG";
import {useHistory, useParams} from "react-router-dom";
import {useState, useEffect} from "react";

//import Prec from "./Prec";

function PrecDetail() {
    const params = useParams();
    const id = params.id;
    const [result, setResult] = useState(null);
    const history = useHistory()

    useEffect(async () => {
        let res = await fetch(`http://34.64.113.234:4000/api/precs/${id}`);
        setResult(await res.json());
    }, []);

    if (result === null) return <div>loading...</div>;

    return (
        <>
            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "10px 10px"
                }}
            >
                <button className='btn btn-outline-warning' onClick={() => history.goBack()}>뒤로 가기</button>
            </div>
            <div className="body">
                <h2 className='mb-3 ml-4'>{result.title}</h2>
                <div className='m-4'>
                    <h3>판시사항</h3>
                    {result.issues}
                </div>
                <div className='m-4'>
                    <h3>전문</h3>
                    {result.wholePrec.split("\n").map((l) => (
                        <span>
						{l}
                            <br/>
						<br/>
					</span>
                    ))}
                </div>
            </div>
        </>
    );
}

export default PrecDetail;
