import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useParams } from "react-router";
import { useGetProjectById } from "../hooks/useGetProjectById";

import ProjectDetail from "../components/organisms/ProjectDetail";
import LoadingSpinner from "../components/atoms/LoadingSpinner";

import { RefetchTodosContext } from "../context/RefetchTodosContext";

const ProjectPage = (): JSX.Element => {
	const { projectId }: { projectId: string } = useParams();
	const { project, loading, error, refetchTodos } =
		useGetProjectById(projectId);

	if (loading) return <LoadingSpinner />;
	if (error) return <div>Error: {JSON.stringify(error)}</div>;
	if (!project) return <Heading>Project not found.</Heading>;
	return (
		<RefetchTodosContext.Provider value={refetchTodos}>
			<Flex pt={6} w="100%" align="center">
				<Box mx="auto" bg="white" w="50%">
					<ProjectDetail project={project} />
				</Box>
			</Flex>
		</RefetchTodosContext.Provider>
	);
};

export default ProjectPage;
