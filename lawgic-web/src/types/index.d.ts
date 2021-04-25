declare module "@material-ui/core/styles/createPalette" {
	interface Palette {
		success: Palette["primary"];
	}
	interface PaletteOptions {
		success: PaletteOptions["primary"];
	}
}

type LikedContext = {
	likedPrecs: number[];
	addPrec: (number) => void;
	delPrec: (number) => void;
};

interface Court {
	name: string;
	code: 400201 | 400202;
}

interface CaseType {
	name: string;
	code: number;
}

interface Issue {
	text: string;
	yo: string;
	refClauses: string[];
	refPrecs: string[];
}

interface Prec {
	precId: number;
	title: string;
	caseNum: string;
	date: Date;
	court: Court;
	caseType: CaseType;
	judgementType: string;
	sentence: string;
	issues?: Issue[];
	wholePrec: string;
	judge: string;
	citationCount: number;
}

type IssuePreview = Omit<Issue, "yo">;

type PrecPreview = Omit<Prec, "wholePrec" | "issues"> & {
	sim: number;
	issues?: IssuePreview[];
};
