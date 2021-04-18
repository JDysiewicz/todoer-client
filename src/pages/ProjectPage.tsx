import React from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { useParams } from "react-router";
import { useGetProjectById } from "../hooks/useGetProjectById";

const ProjectPage = () => {
	const { projectId }: any = useParams();
	const { project, loading, error } = useGetProjectById(projectId);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {JSON.stringify(error)}</div>;
	if (!project) return <Heading>Project not found.</Heading>;
	return (
		<Flex pt={6} w="100%" align="center">
			<Box mx="auto" bg="white" w="50%">
				<Heading>{project.name}</Heading>
				<h2>Todos</h2>
				<ul>
					{console.log(project)}
					{project.todos.map((todo) => {
						return <li key={todo.id}>{todo.title}</li>;
					})}
				</ul>
			</Box>
		</Flex>
	);
};

export default ProjectPage;
