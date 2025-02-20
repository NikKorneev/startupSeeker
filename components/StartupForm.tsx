"use client";

import { useToast } from "@/hooks/use-toast";
import { createPitch } from "@/lib/actions";
import { formSchema } from "@/lib/validation";
import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const StartupForm = () => {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [pitch, setPitch] = useState("");
	const { toast } = useToast();
	const router = useRouter();

	const handleFormSubmit = async (prevState: any, formData: FormData) => {
		try {
			const formValues = {
				title: formData.get("title") as string,
				description: formData.get("description") as string,
				category: formData.get("category") as string,
				link: formData.get("link") as string,
				pitch,
			};

			await formSchema.parseAsync(formValues);

			const result = await createPitch(prevState, formData, pitch);
			console.log(result);

			if (result.status === "OK") {
				toast({
					title: "Success",
					description: "Startup created successfully",
				});
				router.push(`/startup/${result.data._id}`);
			}

			return result;
		} catch (error) {
			const formValues = {
				title: formData.get("title") as string,
				description: formData.get("description") as string,
				category: formData.get("category") as string,
				link: formData.get("link") as string,
				pitch,
			};

			if (error instanceof z.ZodError) {
				const fieldErrors = error.flatten().fieldErrors;

				setErrors(fieldErrors as unknown as Record<string, string>);

				toast({
					title: "Error while submitting the form",
					description: "Please check inputs",
				});

				return {
					...prevState,
					data: formValues,
					error: "Validation failed",
					status: "ERROR",
				};
			}

			toast({
				title: "Unexpected error while submitting the form",
				description: "Please check inputs",
			});

			return {
				...prevState,
				data: formValues,
				error: "Unexpected error",
				status: "ERROR",
			};
		}
	};

	const [state, formAction, isPending] = useActionState(handleFormSubmit, {
		error: "",
		status: "INITIAL",
	});

	return (
		<form action={formAction} className="startup-form">
			<div>
				<label htmlFor="title" className="startup-form_label">
					Title
				</label>
				<Input
					id="title"
					name="title"
					defaultValue={state.data?.title}
					className="startup-form_input"
					required
					placeholder="Startup Title"
				/>
				{errors.title && (
					<p className="startup-form_error">{errors.title}</p>
				)}
			</div>
			<div>
				<label htmlFor="description" className="startup-form_label">
					Description
				</label>
				<Textarea
					id="description"
					name="description"
					defaultValue={state.data?.description}
					className="startup-form_textarea"
					required
					placeholder="Startup Description"
				/>
				{errors.description && (
					<p className="startup-form_error">{errors.description}</p>
				)}
			</div>
			<div>
				<label htmlFor="category" className="startup-form_label">
					Category
				</label>
				<Input
					id="category"
					name="category"
					defaultValue={state.data?.category}
					className="startup-form_input"
					required
					placeholder="Startup Category (Tech, Health, Education...)"
				/>
				{errors.category && (
					<p className="startup-form_error">{errors.category}</p>
				)}
			</div>

			<div>
				<label htmlFor="link" className="startup-form_label">
					Image URL
				</label>
				<Input
					id="link"
					name="link"
					className="startup-form_input"
					required
					defaultValue={state.data?.link}
					placeholder="Startup Image URL"
				/>
				{errors.link ? (
					<p className="startup-form_error">{errors.link}</p>
				) : null}
			</div>

			<div data-color-mode="light">
				<label htmlFor="pitch" className="startup-form_label">
					Pitch
				</label>
				<MDEditor
					value={pitch}
					onChange={(value) => setPitch(value as string)}
					id="pitch"
					defaultValue={pitch}
					preview="edit"
					height={300}
					style={{ borderRadius: 20, overflow: "hidden" }}
					textareaProps={{
						placeholder:
							"Briefly describe your idea and what problem it solves",
					}}
					previewOptions={{
						disallowedElements: ["style"],
					}}
				/>

				{errors.pitch ? (
					<p className="startup-form_error">{errors.pitch}</p>
				) : null}
			</div>

			<Button
				type="submit"
				className="startup-form_btn text-white"
				disabled={isPending}
			>
				{isPending ? "Submitting..." : "Submit Your Pitch"}
				<Send className="size-6 ml-2" />
			</Button>
		</form>
	);
};

export default StartupForm;
