"use server";
import slugify from "slugify";

import { auth } from "@/auth";
import { writeClient } from "@/sanity/lib/write-client";
import { parseServerData } from "./utils";

export async function createPitch(state: any, form: FormData, pitch: string) {
	const session = await auth();

	if (!session)
		return parseServerData({ error: "Not authenticated", status: "ERROR" });

	const { title, description, category, link } = Object.fromEntries(
		Array.from(form).filter(([key]) => key !== "pitch")
	);

	const slug = slugify(title as string, { lower: true, strict: true });

	try {
		const startup = {
			title,
			description,
			category,
			image: link,
			slug: {
				_tipe: slug,
				current: slug,
			},
			author: {
				_type: "reference",
				_ref: session?.id,
			},
			pitch,
		};

		const result = await writeClient.create({
			_type: "startup",
			...startup,
		});
		console.log(result);

		return parseServerData({ data: result, status: "OK", error: "" });
	} catch (error) {
		return parseServerData({
			error: JSON.stringify(error),
			status: "ERROR",
		});
	}
}
