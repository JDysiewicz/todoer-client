import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useParams } from "react-router";
import { useGetProjectById } from "../hooks/useGetProjectById";

import ProjectDetail from "../components/organisms/ProjectDetail";

import { RefetchProjectContext } from "../context/RefetchProjectContext";

const ProjectPage = (): JSX.Element => {
	const { projectId }: { projectId: string } = useParams();
	const { project, loading, error, refetchProjects } =
		useGetProjectById(projectId);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {JSON.stringify(error)}</div>;
	if (!project) return <Heading>Project not found.</Heading>;
	return (
		<RefetchProjectContext.Provider value={refetchProjects}>
			<Flex pt={6} w="100%" align="center">
				<Box mx="auto" bg="white" w="50%">
					<ProjectDetail project={project} />
				</Box>
			</Flex>
		</RefetchProjectContext.Provider>
	);
};

export default ProjectPage;
