import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import React, { ReactNode } from "react";
import { useHistory } from "react-router";
import { client } from "../../api/apollo";
import { User } from "../../types";

interface HeaderProps {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Header: React.FC<HeaderProps> = ({ setUser }) => {
	const history = useHistory();
	const logout = async () => {
		setUser(null);
		localStorage.removeItem("token");
		await client.clearStore();
		history.push("/");
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

const NavBarContainer = ({ children }: { children: ReactNode }) => {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			p={4}
			pb={6}
			bg="#DB4C3F"
			color={["white", "white", "primary.700", "primary.700"]}
		>
			{children}
		</Flex>
	);
};

const Logo = () => {
	return (
		<Box>
			<Heading>Todoer</Heading>
		</Box>
	);
};

export default Header;
