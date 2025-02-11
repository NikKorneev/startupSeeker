import { Search } from "lucide-react";
import Form from "next/form";
import SearchFormReset from "./SearchFormReset";
const SearchForm = ({ query }: { query?: string }) => {
	return (
		<Form action="/" scroll={false} className="search-form">
			<input
				type="text"
				name="query"
				className="search-input"
				defaultValue={query}
				placeholder="Search startups"
			/>

			{query && <SearchFormReset />}

			<button type="submit" className="search-btn text-white">
				<Search className="size-5" />
			</button>
		</Form>
	);
};

export default SearchForm;
