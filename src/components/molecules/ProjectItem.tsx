import React, { useState } from "react";
import { Project } from "../../types";
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useHistory } from "react-router";
import { IconButton } from "@chakra-ui/button";
import { DeleteIcon } from "@chakra-ui/icons";
import { Fade } from "@chakra-ui/transition";

interface ProjectItemProps {
	project: Project;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }): JSX.Element => {
	const history = useHistory();
	return (
		<Box
			onClick={() => history.push(`/project/${project.id}`)}
			cursor="pointer"
			borderRadius="10px"
			my={2}
			w="100%"
			_hover={{ bg: "#ECECEC" }}
		>
			<Flex px={2} justifyContent="space-between" alignItems="center">
				<Text fontSize="lg">{project.name}</Text>
			</Flex>
		</Box>
	);
};

export default ProjectItem;
