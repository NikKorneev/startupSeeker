import { auth, signIn, signOut } from "@/auth";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

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
								<span>Create</span>
							</Link>
							<form
								action={async () => {
									"use server";
									await signOut();
								}}
							>
								<button type="submit">Logout</button>
							</form>
							<Link href={`/user/${session?.id}`}>
								<span>{session?.user?.name}</span>
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
