import { gql, useQuery } from "@apollo/client";
import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Fade } from "@chakra-ui/transition";
import React, { useState } from "react";
import { GET_PROJECTS } from "../../graphql/queries";
import { Project } from "../../types";
import ProjectItem from "../molecules/ProjectItem";
import AddProjectDialog from "./AddProjectDialog";

const SidePanel = (): JSX.Element => {
	const { data, refetch: refetchProjects } = useQuery(GET_PROJECTS);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [showAddProject, setShowAddProject] = useState(false);

	const renderProjects = () => {
		if (!data) return null;
		return data.projects.map((project: Project) => {
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
