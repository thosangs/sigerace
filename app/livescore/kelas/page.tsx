"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useSearchParams } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/icons";
import Image from "next/image";
import icon_image from "@/public/icon.webp";

function getEmoji(rankCell: string): any {
  switch (rankCell) {
    case "1":
      return "🥇";
    case "2":
      return "🥈";
    case "3":
      return "🥉";
    default:
      return rankCell;
  }
}

function KelasFallback() {
  return (
    <LoadingSpinner className="text-5xl h-16 w-auto animate-spin my-auto" />
  );
}

const renderTable = (bracketTitle: string, rows: string[][]) => (
  <Card key={bracketTitle} className="container w-full p-1 my-2 mx-1">
    <CardHeader className="bg-muted">
      <CardTitle>{bracketTitle}</CardTitle>
    </CardHeader>
    <CardContent className="p-0 overflow-x-auto">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            {rows[0].map((header, index) => (
              <TableHead key={index} className="text-center">
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.slice(1).map((row, rowIndex) => (
            <TableRow key={rowIndex} className="p-0">
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className={`p-2 ${
                    rows[0][cellIndex] === "NAMA" ||
                    rows[0][cellIndex] === "KOMUNITAS"
                      ? "whitespace-nowrap text-left capitalize"
                      : "text-center capitalize"
                  }
									${
                    rows[0][cellIndex] === "TOTAL POINT" ||
                    rows[0][cellIndex] === "RANKING" ||
                    rows[0][cellIndex] === "GATE 1" ||
                    rows[0][cellIndex] === "GATE 2" ||
                    rows[0][cellIndex] === "GATE 3"
                      ? "text-primary font-semibold"
                      : ""
                  }
									`}
                >
                  {bracketTitle.toLowerCase().startsWith("final") &&
                  rows[0][cellIndex].toUpperCase() === "RANKING" ? (
                    <span className={`${parseInt(cell) > 3 ? "" : "text-3xl"}`}>
                      {getEmoji(cell.toString())}
                    </span>
                  ) : (
                    cell.toString().toLocaleUpperCase()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

function KelasActive() {
  const searchParams = useSearchParams();
  const tahun = searchParams.get("tahun") || "";
  const tipe = searchParams.get("tipe") || "";

  const [data, setData] = useState<Record<string, any> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (tahun && tipe) {
      setIsLoading(true);
      fetch(`/api/kelas?tahun=${tahun}&tipe=${tipe}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err);
          setIsLoading(false);
        });
    }
  }, [tahun, tipe]);

  if (isLoading) {
    return <KelasFallback />;
  }

  if (error) {
    return (
      <div className="my-auto">
        <div className="text-4xl text-center">Whoopsie!</div>
        <div className="text-center">I know what you do 🚧</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="my-auto">
        <div className="text-4xl text-center">Whoopsie!</div>
        <div className="text-center">No data so far ❌</div>
      </div>
    );
  }
  return (
    <>
      <div className="my-2 mx-auto">
        <hr className="h-1 bg-gradient-to-r from-foreground via-red-500 to-yellow-500" />
        <div className="text-center">
          <span className="inline-block font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-foreground bg-clip-text text-transparent text-3xl align-middle">
            {tipe?.toUpperCase()}
          </span>
          <Image
            src={icon_image}
            placeholder="blur"
            className="my-0 py-2 mx-2 inline-block w-1/12"
            alt="sigerace"
          />
          <span className="inline-block font-bold bg-gradient-to-r from-red-500 via-yellow-500 to-foreground bg-clip-text text-transparent text-3xl align-middle">
            {tahun?.toUpperCase().startsWith("FFA")
              ? "FFA"
              : tahun?.toUpperCase()}
          </span>
        </div>
        <hr className="h-1 bg-gradient-to-r from-foreground via-red-500 to-yellow-500" />
      </div>
      {/* {compGraph} */}
      <div
        className={`${
          Object.keys(data[tahun][tipe]).length === 1
            ? "flex flex-cols w-full sm:w-auto mr-1 mb-12"
            : "grid grid-cols-1 sm:grid-cols-2 sm:gap-5 justify-center mr-1 mb-12"
        }`}
      >
        {Object.entries(data[tahun][tipe]).map(([bracketTitle, rows]) =>
          renderTable(bracketTitle, rows as string[][])
        )}
      </div>
    </>
  );
}

export default function KelasPage() {
  return (
    <Suspense fallback={<KelasFallback />}>
      <KelasActive />
    </Suspense>
  );
}
