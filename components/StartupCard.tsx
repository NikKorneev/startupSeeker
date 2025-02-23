import { formatDate } from "@/lib/utils";
import { Author, Startup } from "@/sanity/types";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export type StartupCardType = Omit<Startup, "author"> & {
	author?: Author;
};

const StartupCard = (props: StartupCardType) => {
	return (
		<li className="startup-card group">
			<div className="flex-between">
				<p className="startup_card_date">
					{formatDate(props._createdAt)}
				</p>
				<div className="flex gap-1.5">
					<EyeIcon className="size-6 text-primary" />
					<span className="text-16-medium">{props.views}</span>
				</div>
			</div>

			<div className="flex-between mt-5 gap-5">
				<div className="flex-1">
					<Link href={`/user/${props.author?._id}`}>
						<p className="text-16-medium line-clamp-1">
							{props.author?.name}
						</p>
					</Link>
					<Link href={`/startup/${props._id}`}>
						<h3 className="text-26-semibold line-clamp-1">
							{props.title}
						</h3>
					</Link>
				</div>
				<Link href={`/user/${props.author?._id}`}>
					<Image
						src={
							props.author?.image || "https://placehold.co/48.png"
						}
						alt="placeholder"
						width={48}
						height={48}
						className="rounded-full overflow-hidden object-cover min-h-12"
					/>
				</Link>
			</div>

			<Link href={`/startup/${props._id}`}>
				<p className="startup-card__desc mb-4 min-h-14 max-h-12 line-clamp-3">
					{props.description}
				</p>
				<img
					src={props.image}
					alt="placeholder"
					className="startup-card_img"
				/>
			</Link>

			<div className="flex-between gap-3 mt-5">
				<Link href={`/?query=${props.category?.toLowerCase()}`}>
					<p className="text-16-medium">{props.category}</p>
				</Link>
				<Button className="startup-card_btn" asChild>
					<Link href={`/startup/${props._id}`}>Details</Link>
				</Button>
			</div>
		</li>
	);
};

export const StartupCardSkeleton = () => (
	<>
		{new Array(4).fill("i").map((_, i) => (
			<li key={i}>
				<Skeleton className="startup-card_skeleton"></Skeleton>
			</li>
		))}
	</>
);

export default StartupCard;
