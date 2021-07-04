import React from "react";
import { Project } from "../../types";
import { Heading } from "@chakra-ui/layout";
import { Flex } from "@chakra-ui/react";

import ProjectSettings from "./ProjectSettings";

interface ProjectHeaderProps {
	project: Project;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ project }) => {
	return (
		<Flex justifyContent="space-between">
			<Heading size="md">{project.name}</Heading>
			<Flex w="20rem" justifyContent="space-evenly" alignItems="center">
				<ProjectSettings />
			</Flex>
		</Flex>
	);
};

export default ProjectHeader;
