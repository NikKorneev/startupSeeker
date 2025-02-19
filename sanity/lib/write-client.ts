import { createClient } from "next-sanity";
import "server-only";

import { apiVersion, dataset, projectId, token } from "../env";

export const writeClient = createClient({
	projectId,
	dataset,
	token,
	apiVersion,
	useCdn: false,
});

if (!writeClient.config().token) {
	throw new Error("Write token not found");
}
