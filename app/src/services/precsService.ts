export type PrecType = {
	_id: string;
	title: string;
	date: Date;
	caseNum: string;
	courtOrder: number;
	citationCount: number;
	isEnBanc: boolean;
	issues: string[];
	order: number;
	yo: string[];
	refClauses: string[][];
	refPrecs: string[][];
	wholePrec: string;
	judge: string;
};

export type CachedPrecType = {
	precId: string;
	title: string;
	date: Date;
	caseNum: string;
	courtOrder: number;
	citationCount: number;
	isEnBanc: boolean;
	issues: string[];
};
