import { formatNumber } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";
import Ping from "./ui/Ping";

const View = async ({ id }: { id: string }) => {
	const { views } = (await client
		.withConfig({ useCdn: false })
		.fetch(STARTUP_VIEWS, { startupId: id })) as {
		views: number | null;
	};

	after(
		async () =>
			await writeClient
				.patch(id)
				.set({ views: (views || 0) + 1 })
				.commit()
	);

	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<Ping />
			</div>
			<div className="view-text">
				<span className="font-black">{formatNumber(views || 0)}</span>
			</div>
		</div>
	);
};

export default View;
