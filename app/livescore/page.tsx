import { cn } from "@/lib/utils";
import { orderedYears, ranges } from "@/lib/kelas";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Suspense } from "react";
import {
	IconFaceWomanShimmer,
	IconFaceManShimmer,
	IconBaby,
	LoadingSpinner,
} from "@/components/ui/icons";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Livescore | Titik Kumpul",
	description:
		"Livescore Kompetisi Titik Kumpul | Exhibition Race by Pushbike Lampung Academy ~ Metro",
};

const typeStyles = {
	boy: "bg-[#389cff]",
	girl: "bg-[#FF69B4]",
	mix: "bg-foreground text-primary-foreground",
};

const typeIcons = {
	boy: <IconFaceManShimmer className="w-6 h-6 mr-2" />,
	girl: <IconFaceWomanShimmer className="w-6 h-6 mr-2" />,
	mix: <IconBaby className="w-6 h-6 mr-2" />,
};

function LivescoreFallback() {
	return <LoadingSpinner />;
}

function LivescoreActive() {
	return (
		<div className="max-w-6xl grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 py-8">
			{orderedYears.map((year) => (
				<Card key={year}>
					<CardHeader className="bg-muted rounded-sm py-4">
						<CardTitle>{year}</CardTitle>
					</CardHeader>
					<CardContent className="flex gap-4">
						{Object.entries(ranges[year]).map(([type, values]) => {
							const eventType = type as YearType;
							return (
								<div className="flex-1" key={eventType}>
									<div className="flex justify-center mt-4">
										<Link
											href={`/livescore/kelas?tahun=${year}&tipe=${eventType}`}
											className={cn(
												"inline-flex h-12 items-center justify-center rounded-md px-8 text-sm font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
												typeStyles[eventType]
											)}
											prefetch={false}
										>
											{typeIcons[eventType]}{" "}
											<span className="font-bold">{eventType.toUpperCase()}</span>
										</Link>
									</div>
								</div>
							);
						})}
					</CardContent>
				</Card>
			))}
		</div>
	);
}

export default function Livescore() {
	return (
		<Suspense fallback={<LivescoreFallback />}>
			<LivescoreActive />
		</Suspense>
	);
}
