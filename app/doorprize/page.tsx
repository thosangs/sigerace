import ListDoorprize from "@/lib/doorprize";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Doorprize | Sigerace 2025",
  description: "Jadwal Sigerace 2025 | by Pushbike Lampung Academy",
};

export default function Jadwal() {
  return (
    <>
      <div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-4 mt-4 mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4">Doorprize</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-muted-foreground text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-bold whitespace-nowrap">
                  Doorprize
                </th>
                <th className="p-4 text-center font-bold whitespace-nowrap">
                  Winner
                </th>
              </tr>
            </thead>
            <tbody>
              {ListDoorprize.map((doorprize, index) => (
                <tr className="border-b" key={index}>
                  <td className="p-2">{doorprize.doorprize}</td>
                  <td className="p-2">{doorprize.winner.toUpperCase()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
