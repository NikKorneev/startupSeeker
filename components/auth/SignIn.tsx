import { signIn } from "@/auth";

const SignIn = () => {
	return (
		<form
			action={async () => {
				"use server";
				await signIn("google");
			}}
		>
			<button
				type="submit"
				className="bg-orange-500 rounded-2xl px-5 py-2"
			>
				Sign In
			</button>
		</form>
	);
};

export default SignIn;
