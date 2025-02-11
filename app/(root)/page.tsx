import SearchForm from "@/components/SearchForm";

const Page = async ({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>;
}) => {
	const query = (await searchParams).query;
	return (
		<div className="pink_container">
			<h1 className="heading">
				Pitch Your Startup, <br /> Connect With Enterpreteurs
			</h1>
			<p className="sub-heading !max-w-3xl">
				Submit Ideas, Vote on Pitches, and Get Noticed in Virtual
			</p>
			<SearchForm query={query} />
		</div>
	);
};

export default Page;
