import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Fade } from "@chakra-ui/transition";
import React, { useContext, useState } from "react";
import { ProjectsContext } from "../../context/ProjectsContext";

import { Project } from "../../types";
import ProjectItem from "../molecules/ProjectItem";
import AddProjectDialog from "./AddProjectDialog";

const SidePanel = (): JSX.Element => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const { projects, refetchProjects } = useContext(ProjectsContext);

	const [showAddProject, setShowAddProject] = useState(false);

	const renderProjects = () => {
		if (!projects) return null;
		return projects.map((project: Project) => {
			return <ProjectItem key={project.id} project={project} />;
		});
	};

	return (
		<Box pt={6} pl={12} h="100vh" bg="#FAFAFA" w="100%">
			<Box
				onMouseLeave={() => setShowAddProject(false)}
				onMouseEnter={() => setShowAddProject(true)}
			>
				<Flex justifyContent="space-between" alignItems="center">
					<Heading size="md">Projects</Heading>
					<Fade in={showAddProject}>
						<IconButton
							variant="ghost"
							_hover={{ bg: "#ECECEC" }}
							aria-label="add project"
							icon={<AddIcon />}
							onClick={onOpen}
							size="xs"
						/>
					</Fade>
				</Flex>
				{renderProjects()}
				<AddProjectDialog
					refetchProjects={refetchProjects}
					isOpen={isOpen}
					onClose={onClose}
				/>
			</Box>
		</Box>
	);
};

export default SidePanel;
