import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import React from "react";
import { client } from "../api/apollo";

const Header = ({ setUser }: any) => {
	const logout = async () => {
		setUser(null);
		localStorage.removeItem("token");
		await client.clearStore();
	};

	return (
		<NavBarContainer>
			<Logo />
			<Button color="black" onClick={() => logout()}>
				Logout!
			</Button>
		</NavBarContainer>
	);
};

const NavBarContainer = ({ children }: any) => {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			mb={12}
			p={6}
			bg="#DB4C3F"
			color={["white", "white", "primary.700", "primary.700"]}
		>
			{children}
		</Flex>
	);
};

const Logo = (props: any) => {
	return (
		<Box {...props}>
			<Heading>Todoer</Heading>
		</Box>
	);
};

export default Header;
