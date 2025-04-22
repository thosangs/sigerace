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

    // Process the data to handle numbers and headers
    if (data && data[year] && data[year][type]) {
      for (const competition in data[year][type]) {
        if (data[year][type].hasOwnProperty(competition)) {
          const results = data[year][type][competition];

          // Process headers first
          if (results.length > 0) {
            const headers = results[0];
            let motoCount = 1;
            for (let i = 0; i < headers.length; i++) {
              if (headers[i] === "GATE") {
                headers[i] = `GATE ${motoCount}`;
              } else if (headers[i] === "FINISH") {
                headers[i] = `FINISH ${motoCount}`;
                motoCount++;
              }
            }
          }

          // Process each row after headers
          for (let i = 1; i < results.length; i++) {
            const row = results[i];
            // Format each cell in the row
            for (let j = 0; j < row.length; j++) {
              const value = row[j];
              // Check if the value is a number and not an empty string
              if (typeof value === "number" && !isNaN(value)) {
                // Round to 2 decimal places for floating point numbers
                if (value % 1 !== 0) {
                  results[i][j] = Number(value.toFixed(2));
                }
              }
            }
          }
        }
      }
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
