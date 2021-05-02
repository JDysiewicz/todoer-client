import { gql, useQuery } from "@apollo/client";
import { Box, Text } from "@chakra-ui/layout";
import React from "react";
import { useHistory } from "react-router";

const PROJECTS = gql`
	query Projects {
		projects {
			color
			id
			name
			order
			todos {
				due
				id
				title
			}
		}
	}
`;

const SidePanel = () => {
	const { data } = useQuery(PROJECTS);
	const history = useHistory();
	const renderProjects = () => {
		if (!data) return null;
		return data.projects.map((project: any) => {
			return (
				<Box
					onClick={() => history.push(`/project/${project.id}`)}
					cursor="pointer"
					my={4}
					py={2}
					mr={6}
					borderRadius="10px"
					bg="#DDDDDD"
				>
					<Text fontSize="lg" key={project.id}>
						{project.name}
					</Text>
				</Box>
			);
		});
	};

	return (
		<Box pt={6} pl={12} h="100vh" bg="#EEEEEE" w="100%">
			<Text>Side Bar</Text>
			{renderProjects()}
		</Box>
	);
};

export default SidePanel;
