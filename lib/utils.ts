import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
		year: "numeric",
	});
}

export function formatNumber(num: number) {
	return num + " " + (+num > 1 ? "views" : "view");
}

export function parseServerData<T>(response: T) {
	return JSON.parse(JSON.stringify(response));
}
