import { NextRequest, NextResponse } from "next/server";
import { ranges } from "@/lib/kelas";

export const runtime = "edge";

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url);
	const year = searchParams.get("tahun") || "";
	const type = searchParams.get("tipe") as YearType;

	// Validate that the year exists in the ranges
	if (!year || !(year in ranges)) {
		return NextResponse.json(
			{ error: "Invalid or missing parameter" },
			{ status: 400 }
		);
	}

	// Validate that the type exists in the ranges[year]
	if (!type || !(type in ranges[year])) {
		return NextResponse.json(
			{ error: "Invalid or missing parameter" },
			{ status: 400 }
		);
	}

	// Get the API URL from the environment variables
	const apiUrl = process.env.APPSCRIPT_SHEET_API || "";
	const payload = {
		[year]: {
			[type]: ranges[year][type],
		},
	};
	try {
		const response = await fetch(apiUrl!, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		let data = await response.json();
		// Process the data to replace empty header columns
		if (data && data[year] && data[year][type]) {
			for (const competition in data[year][type]) {
				if (data[year][type].hasOwnProperty(competition)) {
					const results = data[year][type][competition];
					const headers = results[0]; // First row is the header

					// Count the number of empty headers at the end
					const emptyHeaderCount = headers
						.slice(-2)
						.filter((header: string) => !header).length;

					if (emptyHeaderCount === 2) {
						headers[headers.length - 2] = "POIN";
						headers[headers.length - 1] = "RANK";
					} else if (emptyHeaderCount === 1) {
						headers[headers.length - 1] = "POSISI";
					}

					// Replace the headers in the results
					data[year][type][competition][0] = headers;
				}
			}
		}

		return NextResponse.json(data, { status: 200 });
	} catch (error: any) {
		return NextResponse.json({ error: error.message }, { status: 500 });
	}
}
