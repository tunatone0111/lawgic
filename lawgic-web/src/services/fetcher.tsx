import axios from "axios";

const fetcher = (url: string) =>
	axios.get(url).then((res) => {
		console.log(res.data);
		return res.data;
	});

export async function mockFetcher(): Promise<{
	precs: PrecPreview[];
	eTime: number;
}> {
	const precs = Array(100)
		.fill({
			sim: 0.9,
			caseNum: "2015도19296",
			caseType: {
				code: 400102,
				name: "형사",
			},
			citationCount: 0,
			court: {
				code: 400201,
				name: "대법원",
			},
			date: new Date(),
			issues: Array(3).fill({
				text: "판시사항1",
				refClauses: [],
				refPrecs: [],
			}),
			judge: "잘 몰라요",
			judgementType: "판결",
			precId: 212839,
			sentence: "선고",
			title: "대통령기록물관리에관한법률위반공용전자기록등손상",
		})
		.map((p, idx) => ({ ...p, date: new Date(`${2030 - idx}-01-01`) }));

	return Promise.resolve({ precs, eTime: 100 });
}

export default fetcher;
