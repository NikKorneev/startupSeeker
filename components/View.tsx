import { formatNumber } from "@/lib/utils";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUP_VIEWS } from "@/sanity/lib/queries";
import Ping from "./ui/Ping";

const View = async ({ id }: { id: string }) => {
	const { data } = await sanityFetch({
		query: STARTUP_VIEWS,
		params: {
			startupId: id,
		},
	});

	return (
		<div className="view-container">
			<div className="absolute -top-2 -right-2">
				<Ping />
			</div>
			<div className="view-text">
				<span className="font-black">{formatNumber(data.views)}</span>
			</div>
			<SanityLive />
		</div>
	);
};

export default View;
