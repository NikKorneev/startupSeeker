/* eslint-disable @next/next/no-img-element */
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_QUERY } from "@/sanity/lib/queries";
import markdownit from "markdown-it";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const md = markdownit();
export const experimental_ppr = true;

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
	const id = (await params).id;

	const data = await client.fetch(STARTUP_QUERY, { startupId: id });

	if (!data) return notFound();

	const parsedContent = md.render(data?.pitch || "");

	return (
		<>
			<section className="pink_container !min-h-[230px]">
				<p className="tag">{formatDate(data._createdAt)}</p>
				<h1 className="heading">{data.title}</h1>
				<p className="sub-heading !max-w-5xl">{data.description}</p>
			</section>

			<section className="section_container">
				<img
					src={data.image || "https://placehold.co/48"}
					alt="thumbnail"
					className="w-full h-auto rounded-xl"
				/>
				<div className="space-y-5 mt-10 max-w-4xl mx-auto">
					<div className="flex-between gap-5">
						<Link
							href={`/user/${data.author?._id}`}
							className="flex gap-2 items-center mb-3"
						>
							<Image
								src={
									data.author?.image ||
									"https://placehold.co/48"
								}
								alt="avatar"
								width={64}
								height={64}
								className="rounded-full drop-shadow-lg object-cover min-h-16"
							/>
							<div>
								<p className="text-20-medium">
									{data.author?.name}
								</p>
								<p className="text-16-medium !text-black-300">
									@{data.author?.username}
								</p>
							</div>
						</Link>

						<p className="category-tag">{data.category}</p>
					</div>

					<h3 className="text-16-medium">Startup Details</h3>
					{parsedContent ? (
						<article
							className="prose max-w-4xl mx-auto break-all"
							dangerouslySetInnerHTML={{ __html: parsedContent }}
						/>
					) : (
						<p className="no-result">No details provided</p>
					)}
				</div>

				<hr className="divider" />

				{/* TODO: editor recs */}

				<Suspense fallback={<Skeleton className="view_skeleton" />}>
					<View id={data._id} />
				</Suspense>
			</section>
		</>
	);
};

export default Page;
