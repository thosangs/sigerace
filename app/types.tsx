type YearType = "boy" | "girl" | "mix";

type Dictionary = {
	[year: string]: {
		[key in YearType]?: number;
	};
};
