import React, { useRef, useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";

import ErrorMessage from "../atoms/ErrorMessage";

import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginUser } from "../../hooks/useLoginUser";
import { User } from "../../types";

interface LoginFormInputs {
	email: string;
	password: string;
}

interface LoginFormProps {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ setUser }): JSX.Element => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<LoginFormInputs>();

	const password = useRef({});
	password.current = watch("password", "");

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const loginUser = useLoginUser({
		setIsSubmitting,
		setUser,
		setError,
	});

	const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
		setIsSubmitting(true);
		loginUser({
			variables: { email: data.email, password: data.password },
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<FormControl id="email">
				<FormLabel>Email address</FormLabel>
				<Input
					maxWidth="20rem"
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
					maxWidth="20rem"
					{...register("password", {
						required: {
							value: true,
							message: "Please enter a password",
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
			<Button width="full" mt={6} disabled={isSubmitting} type="submit">
				Login
			</Button>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</form>
	);
};

export default LoginForm;
