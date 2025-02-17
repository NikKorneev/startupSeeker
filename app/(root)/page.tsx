import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

const Page = async ({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) => {
	const query = (await searchParams).query;

	const params = { search: query || null };
	const { data: posts } = (await sanityFetch({
		query: STARTUPS_QUERY,
		params,
	})) as unknown as { data: StartupCardType[] };

	return (
		<>
			<section className="pink_container">
				<h1 className="heading">
					Pitch Your Startup, <br /> Connect With Enterpreteurs
				</h1>
				<p className="sub-heading !max-w-3xl">
					Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
				</p>
				<SearchForm query={query} />
			</section>

			<section className="section_container">
				<p className="text-30-semibold">
					{query ? "Results for " + query : "Trending"}
				</p>

				<ul className="mt-7 card_grid">
					{posts.length > 0 ? (
						posts.map((post) => (
							<StartupCard {...post} key={post._id} />
						))
					) : (
						<p className="no-results">No startups found</p>
					)}
				</ul>
			</section>

			<SanityLive />
		</>
	);
};

export default Page;
