import { Button } from "@chakra-ui/button";
import { Flex } from "@chakra-ui/layout";
import React from "react";
import { useHistory } from "react-router";
import { client } from "../../api/apollo";
import { User } from "../../types";
import Logo from "../atoms/Logo";

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
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			p={2}
			pb={2}
			bg="#DB4C3F"
			color={["white", "white", "primary.700", "primary.700"]}
		>
			<Logo />
			<Button color="black" onClick={() => logout()}>
				Logout!
			</Button>
		</Flex>
	);
};

export default Header;
