import React from "react";

import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

const ProjectSettings = (): JSX.Element => {
	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="Project options"
				icon={<HamburgerIcon />}
				variant="outline"
			/>
			<MenuList>
				<MenuItem icon={<DeleteIcon />}>Delete project</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default ProjectSettings;
