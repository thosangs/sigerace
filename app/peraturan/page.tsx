import rules from "@/lib/peraturan";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "X-Anda Racephoria | Peraturan",
	description:
		"Peraturan umum yang wajib diikuti oleh peserta X-Anda | Racephoria by Pushbike Lampung Academy ~ Lampung Selatan",
};

export default function Peraturan() {
	return (
		<div className="px-2 py-4">
			<div className="w-full max-w-3xl bg-background rounded-lg shadow-lg p-6">
				<h2 className="text-xl font-bold text-primary mb-4">Peraturan</h2>
				<div className="space-y-4">
					{Object.entries(rules).map(([category, items]) => (
						<div key={category}>
							<h3 className="text-lg font-semibold text-muted-foreground mb-2">
								{category}
							</h3>
							<hr className="pb-2" />
							<ol className="list-decimal list-inside text-muted-foreground">
								{items.map((rule, index) => (
									<li key={index} className="pb-2 text-xs">
										{rule}
									</li>
								))}
							</ol>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
