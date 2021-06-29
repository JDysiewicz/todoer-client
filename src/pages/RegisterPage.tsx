import React, { useState } from "react";
import {
	FormControl,
	FormLabel,
	Input,
	Box,
	Heading,
	Button,
	Flex,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useRegisterUser } from "../hooks/useRegisterUser";

const Register = (): JSX.Element => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	const [name, setName] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const register = useRegisterUser({
		setIsSubmitting,
		setError,
	});

	return (
		<Flex width="full" align="center" justifyContent="center">
			<Box m={10} p={2}>
				<Box textAlign="center">
					<Heading marginBottom="10px">Create Account</Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setIsSubmitting(true);
							register({
								variables: {
									email,
									password,
									name,
									passwordConfirmation,
								},
							});
						}}
					>
						<FormControl id="name">
							<FormLabel>Name</FormLabel>
							<Input
								value={name}
								type="text"
								onChange={(e) => setName(e.target.value)}
							/>
						</FormControl>

						<FormControl id="email">
							<FormLabel>Email address</FormLabel>
							<Input
								value={email}
								type="email"
								onChange={(e) => setEmail(e.target.value)}
							/>
						</FormControl>

						<FormControl id="password">
							<FormLabel>Password</FormLabel>
							<Input
								value={password}
								type="password"
								onChange={(e) => setPassword(e.target.value)}
							/>
						</FormControl>
						<FormControl id="password-confirmation">
							<FormLabel>Confirm Password</FormLabel>
							<Input
								value={passwordConfirmation}
								type="password"
								onChange={(e) =>
									setPasswordConfirmation(e.target.value)
								}
							/>
						</FormControl>
						<Button
							width="full"
							mt={6}
							disabled={isSubmitting}
							type="submit"
						>
							Create Account
						</Button>
						{error && <p style={{ color: "red" }}>{error}</p>}
					</form>
				</Box>
				<NavLink to="/">Already have an account? Sign in!</NavLink>
			</Box>
		</Flex>
	);
};

export default Register;
