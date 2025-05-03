import sponsor from "@/lib/sponsor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Peraturan | Sigerace 2025",
  description:
    "Peraturan umum yang wajib diikuti oleh peserta Sigerace 2025 | by Pushbike Lampung Academy",
};

export default function Peraturan() {
  return (
    <div className="px-2 py-4 mb-12">
      <div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Sponsor</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {sponsor.map((sponsor) => (
            <div key={sponsor} className="text-xs p-2 bg-accent/10 rounded-lg">
              {sponsor}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
