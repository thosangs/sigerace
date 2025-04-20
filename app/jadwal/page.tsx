import listJadwal from "@/lib/jadwal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jadwal | Sigerace 2025",
  description: "Jadwal Sigerace 2025 | by Pushbike Lampung Academy",
};

export default function Jadwal() {
  return (
    <>
      <div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-4 mt-4">
        <h2 className="text-2xl font-bold text-primary mb-4">Penting</h2>
        <div className="overflow-x-auto">
          Peserta diwajibkan datang <b className="text-primary">90 menit</b>{" "}
          sebelum jadwal race yang dicantumkan
        </div>
      </div>
      <div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-4 mt-4">
        <h2 className="text-2xl font-bold text-primary mb-4">Jadwal</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-muted-foreground text-sm">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left font-semibold whitespace-nowrap">
                  Event
                </th>
                <th className="p-4 text-center font-semibold whitespace-nowrap">
                  Waktu
                </th>
                <th className="p-4 text-left font-semibold whitespace-nowrap">
                  Catatan
                </th>
              </tr>
            </thead>
            <tbody>
              {listJadwal.map((event, index) => (
                <tr className="border-b" key={index}>
                  <td className="p-2 whitespace-nowrap">{event.details}</td>
                  <td className="p-2 whitespace-nowrap text-center">
                    {event.time}
                  </td>
                  <td className="p-2 whitespace-nowrap">{event.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-4 mt-4 mb-12">
        <h2 className="text-2xl font-bold text-primary mb-4">Lokasi Race</h2>
        <div className="overflow-x-auto">
          <div className="mb-2 font-semibold">
            Institut Teknologi Sumatera, Bandar Lampung, Lampung (
            <a
              href="https://www.google.com/maps/place/Institut+Teknologi+Sumatera+%22ITERA%22/data=!4m2!3m1!1s0x0:0xcb3cf692dbb4f26?sa=X&ved=1t:2428&ictx=111"
              target="_blank"
              className="text-blue-500"
            >
              GMAPS
            </a>
            )
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6666666666667!2d105.3148495!3d-5.3582643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40c35634c1a611%3A0xcb3cf692dbb4f26!2sInstitut%20Teknologi%20Sumatera!5e0!3m2!1sen!2sid!4v1709799999999!5m2!1sen!2sid"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg"
          />
        </div>
      </div>
    </>
  );
}
