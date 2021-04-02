import { useEffect, useState } from "react";

const useFetch = (url) => {
	const [state, setState] = useState({ data: null, loadng: true, eTime: 0 });

	useEffect(() => {
		setState({ loading: true });
		const sTime = new Date().getTime();
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setState({
					data: res,
					loading: false,
					eTime: new Date().getTime() - sTime
				});
			});
	}, [url]);

	return state;
};

export default useFetch;
