import React, { useContext } from "react";

import { IconButton } from "@chakra-ui/react";
import { DeleteIcon, HamburgerIcon } from "@chakra-ui/icons";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";

import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../../graphql/mutations";
import { Project } from "../../types";
import { useHistory } from "react-router-dom";
import { ProjectsContext } from "../../context/ProjectsContext";

interface ProjectSettingsProps {
	project: Project;
}

const ProjectSettings: React.FC<ProjectSettingsProps> = ({
	project,
}): JSX.Element => {
	const history = useHistory();
	const { refetchProjects } = useContext(ProjectsContext);

	const [deleteProject] = useMutation(DELETE_PROJECT, {
		onCompleted: (data) => {
			refetchProjects();
			history.push("/");
		},
	});

	return (
		<Menu>
			<MenuButton
				as={IconButton}
				aria-label="Project options"
				icon={<HamburgerIcon />}
				variant="outline"
			/>
			<MenuList>
				<MenuItem
					onClick={() =>
						deleteProject({
							variables: { id: project.id },
						})
					}
					icon={<DeleteIcon />}
				>
					Delete project
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default ProjectSettings;
