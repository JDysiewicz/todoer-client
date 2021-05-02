import React, { useState } from "react";
import { Box, Flex, Heading, ListItem, UnorderedList } from "@chakra-ui/layout";
import { useParams } from "react-router";
import { useGetProjectById } from "../hooks/useGetProjectById";
import AddItem from "../components/molecules/AddItem";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";
import { Checkbox } from "@chakra-ui/checkbox";
import { useMutation } from "@apollo/client";

import { DELETE_TODO } from "../graphql/mutations";

const ProjectPage = (): JSX.Element => {
	const { projectId }: { projectId: string } = useParams();
	const { project, loading, error, refetchProjects } = useGetProjectById(
		projectId
	);

	const [isOpen, setIsOpen] = useState(false);

	const [deleteTodo] = useMutation(DELETE_TODO, {
		onCompleted: () => {
			refetchProjects();
		},
	});

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {JSON.stringify(error)}</div>;
	if (!project) return <Heading>Project not found.</Heading>;
	return (
		<Flex pt={6} w="100%" align="center">
			<Box mx="auto" bg="white" w="50%">
				<Heading>{project.name}</Heading>
				<UnorderedList marginTop="4" listStyleType="none" spacing="3">
					{project.todos.map((todo) => {
						return (
							<ListItem key={todo.id}>
								<Checkbox
									colorScheme="red"
									onChange={(e) =>
										deleteTodo({
											variables: {
												id: todo.id,
											},
										})
									}
								>
									{todo.title}
								</Checkbox>
							</ListItem>
						);
					})}
				</UnorderedList>
				{isOpen ? (
					<AddItem
						projectId={projectId}
						refetchProjects={refetchProjects}
						closeAddItem={() => setIsOpen(false)}
					/>
				) : (
					<Button
						marginTop="4"
						leftIcon={<AddIcon />}
						variant="ghost"
						onClick={() => setIsOpen(true)}
						_hover={{ bg: "#DB4C3F", color: "#FFFFFF" }}
					>
						Add todo
					</Button>
				)}
			</Box>
		</Flex>
	);
};

export default ProjectPage;
