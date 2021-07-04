import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import { User } from "../types";
import { NavLink } from "react-router-dom";
import LoginForm from "../components/organisms/LoginForm";

const LoginPage = ({
	setUser,
}: {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}): JSX.Element => {
	return (
		<Flex width="full" align="center" justifyContent="center">
			<Box m={10} p={2}>
				<Box textAlign="center">
					<Heading marginBottom="10px">Login</Heading>
				</Box>
				<Box my={4} textAlign="left">
					<LoginForm setUser={setUser} />
				</Box>
				<NavLink to="/register">Create an account</NavLink>
			</Box>
		</Flex>
	);
};

export default LoginPage;
