import React, { useContext, useState } from "react";
import { Project } from "../../types";

import AddItem from "../molecules/AddItem";
import { Button } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";

import TodoList from "../molecules/TodoList";
import { useEffect } from "react";
import { RefetchProjectContext } from "../../context/RefetchProjectContext";

import ProjectHeader from "../molecules/ProjectHeader";

interface ProjectDetailProps {
	project: Project;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project }) => {
	const [isOpen, setIsOpen] = useState(false);
	const refetch = useContext(RefetchProjectContext);

	// when project changes reset add item state, however keep open
	// after adding an item
	useEffect(() => {
		setIsOpen(false);
	}, [project.id]);

	return (
		<>
			<ProjectHeader project={project} />

			<TodoList project={project} />
			{isOpen ? (
				<AddItem
					projectId={project.id}
					refetchProjects={refetch}
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
		</>
	);
};

export default ProjectDetail;
