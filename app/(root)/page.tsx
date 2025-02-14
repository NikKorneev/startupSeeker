import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

const Page = async ({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) => {
	const query = (await searchParams).query;

	const posts = [
		{
			_createdAt: new Date(),
			views: 55,
			author: { _id: 1, name: "Victor" },
			_id: 1,
			description: "This is description",
			image: "https://placehold.co/400",
			category: "Robots",
			title: "We Robots",
		},
		{
			_createdAt: new Date(),
			views: 55,
			author: { _id: 1, name: "Victor" },
			_id: 1,
			description: "This is description",
			image: "https://placehold.co/400",
			category: "Robots",
			title: "We Robots",
		},
		{
			_createdAt: new Date(),
			views: 55,
			author: { _id: 1, name: "Victor" },
			_id: 1,
			description: "This is description",
			image: "https://placehold.co/400",
			category: "Robots",
			title: "We Robots",
		},
	];
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
							<StartupCard post={post} key={post._id} />
						))
					) : (
						<p className="no-results">No startups found</p>
					)}
				</ul>
			</section>
		</>
	);
};

export default Page;
