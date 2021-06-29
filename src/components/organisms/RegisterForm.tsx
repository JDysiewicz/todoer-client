import React, { useRef, useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import ErrorMessage from "../atoms/ErrorMessage";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRegisterUser } from "../../hooks/useRegisterUser";

interface RegisterFormInputs {
	name: string;
	email: string;
	password: string;
	passwordConfirmation: string;
}

const RegisterForm = (): JSX.Element => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<RegisterFormInputs>();

	const password = useRef({});
	password.current = watch("password", "");

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const onSubmit: SubmitHandler<RegisterFormInputs> = (data) => {
		setIsSubmitting(true);
		registerUser({
			variables: {
				email: data.email,
				password: data.password,
				name: data.name,
				passwordConfirmation: data.passwordConfirmation,
			},
		});
	};

	const registerUser = useRegisterUser({
		setIsSubmitting,
		setError,
	});

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl id="name">
				<FormLabel>Name</FormLabel>
				<Input
					{...register("name", {
						required: {
							value: true,
							message: "Please enter a name",
						},
					})}
				/>
				{errors.name && (
					<ErrorMessage message={errors.name.message || "Error"} />
				)}
			</FormControl>

			<FormControl id="email">
				<FormLabel>Email address</FormLabel>
				<Input
					type="email"
					{...register("email", {
						required: {
							value: true,
							message: "Please enter an email address",
						},
					})}
				/>
				{errors.email && (
					<ErrorMessage message={errors.email.message || "Error"} />
				)}
			</FormControl>

			<FormControl id="password">
				<FormLabel>Password</FormLabel>
				<Input
					{...register("password", {
						required: {
							value: true,
							message: "Please enter a password",
						},
						minLength: {
							value: 8,
							message:
								"Password must be at least 8 characters long",
						},
					})}
					type="password"
				/>
				{errors.password && (
					<ErrorMessage
						message={errors.password.message || "Error"}
					/>
				)}
			</FormControl>
			<FormControl id="password-confirmation">
				<FormLabel>Confirm Password</FormLabel>
				<Input
					{...register("passwordConfirmation", {
						required: {
							value: true,
							message: "Please confirm your password",
						},
						validate: (value) =>
							value === password.current ||
							"Passwords do not match",
					})}
					type="password"
				/>
				{errors.passwordConfirmation && (
					<ErrorMessage
						message={errors.passwordConfirmation.message || "Error"}
					/>
				)}
			</FormControl>
			<Button width="full" mt={6} disabled={isSubmitting} type="submit">
				Create Account
			</Button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</form>
	);
};

export default RegisterForm;
