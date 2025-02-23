import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface SessionWithId extends Session {
	id?: string;
}

const Navbar = async () => {
	const session = (await auth()) as SessionWithId | null;
	return (
		<header className="px-5 py-3 bg-white shadow-sm font-work-sans">
			<nav className="flex justify-between items-center">
				<Link href="/">
					<Image src="/logo.svg" alt="logo" width={144} height={30} />
				</Link>

				<div className="flex items-center gap-5 text-black">
					{session?.user ? (
						<>
							<Link href="/startup/create">
								<span className="max-sm:hidden">Create</span>
								<BadgePlus className="size-6 sm:hidden" />
							</Link>
							<form
								action={async () => {
									"use server";
									await signOut();
								}}
							>
								<button type="submit">
									<span className="max-sm:hidden">
										Logout
									</span>
									<LogOut className="sm:hidden size-6 text-red-500" />
								</button>
							</form>
							<Link href={`/user/${session?.id}`}>
								<Avatar className="size-10">
									<AvatarImage
										src={session?.user?.image || ""}
										alt={session?.user?.name || ""}
									/>
									<AvatarFallback>AV</AvatarFallback>
								</Avatar>
							</Link>
						</>
					) : (
						<>
							<form
								action={async () => {
									"use server";
									await signIn();
								}}
							>
								<button type="submit">Login</button>
							</form>
						</>
					)}
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
