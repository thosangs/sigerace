import listJadwal from "@/lib/jadwal";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Titik Kumpul Exhibition Race | Jadwal",
	description:
		"Jadwal kompetisi Titik Kumpul | Exhibition Race by Pushbike Lampung Academy ~ Metro",
};

export default function Jadwal() {
	return (
		<>
			<div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-4 mt-4">
				<h2 className="text-2xl font-bold text-primary mb-4">Penting</h2>
				<div className="overflow-x-auto">
					Peserta diwajibkan datang <b className="text-primary">90 menit</b> sebelum
					jadwal race yang dicantumkan
				</div>
			</div>
			<div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-4 my-4">
				<h2 className="text-2xl font-bold text-primary mb-4">Jadwal</h2>
				<div className="overflow-x-auto">
					<table className="w-full text-muted-foreground text-sm">
						<thead>
							<tr className="border-b">
								<th className="p-4 text-left font-semibold whitespace-nowrap">Event</th>
								<th className="p-4 text-left font-semibold whitespace-nowrap">Waktu</th>
								<th className="p-4 text-left font-semibold whitespace-nowrap">
									Catatan
								</th>
							</tr>
						</thead>
						<tbody>
							{listJadwal.map((event, index) => (
								<tr className="border-b" key={index}>
									<td className="p-2 whitespace-nowrap">{event.details}</td>
									<td className="p-2 whitespace-nowrap">{event.time}</td>
									<td className="p-2 whitespace-nowrap">{event.note}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
