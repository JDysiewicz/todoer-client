import React from "react";
import { Project } from "../../types";
import { ListItem, UnorderedList } from "@chakra-ui/layout";
import TodoItem from "../atoms/TodoItem";

interface TodoListProps {
	project: Project;
	refetch: () => Promise<void>;
}

const TodoList: React.FC<TodoListProps> = ({ project, refetch }) => {
	return (
		<UnorderedList marginTop="4" listStyleType="none" spacing="3">
			{project.todos.map((todo) => {
				return (
					<ListItem key={todo.id}>
						<TodoItem todo={todo} refetch={refetch} />
					</ListItem>
				);
			})}
		</UnorderedList>
	);
};

export default TodoList;
