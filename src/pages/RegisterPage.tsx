import React from "react";
import { Box, Heading, Flex } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import RegisterForm from "../components/organisms/RegisterForm";

const RegisterPage = (): JSX.Element => {
	return (
		<Flex width="full" align="center" justifyContent="center">
			<Box m={10} p={2}>
				<Box textAlign="center">
					<Heading marginBottom="10px">Create Account</Heading>
				</Box>
				<Box my={4} textAlign="left">
					<RegisterForm />
				</Box>
				<NavLink to="/">Already have an account? Sign in!</NavLink>
			</Box>
		</Flex>
	);
};

export default RegisterPage;
