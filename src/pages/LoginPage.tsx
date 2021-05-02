import React, { useState } from "react";
import { useLoginUser } from "../hooks/useLoginUser";
import {
	FormControl,
	FormLabel,
	Input,
	Box,
	Heading,
	Button,
	Flex,
} from "@chakra-ui/react";
import { User } from "../types";

const Login = ({
	setUser,
}: {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}): JSX.Element => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState("");

	const login = useLoginUser({
		setEmail,
		setPassword,
		setIsSubmitting,
		setUser,
		setError,
	});

	return (
		<Flex width="full" align="center" justifyContent="center">
			<Box m={10} p={2}>
				<Box textAlign="center">
					<Heading marginBottom="10px">Login</Heading>
				</Box>
				<Box my={4} textAlign="left">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							setIsSubmitting(true);
							login({
								variables: { email, password },
							});
						}}
					>
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
						<Button
							width="full"
							mt={6}
							disabled={isSubmitting}
							type="submit"
						>
							Log in
						</Button>
						{error && <p style={{ color: "red" }}>{error}</p>}
					</form>
				</Box>
			</Box>
		</Flex>
	);
};

export default Login;
