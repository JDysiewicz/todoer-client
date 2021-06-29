import React from "react";
import { Todo } from "../../types";
import { Checkbox } from "@chakra-ui/checkbox";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../../graphql/mutations";
interface TodoItemProps {
	todo: Todo;
	refetch: () => Promise<void>;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, refetch }) => {
	const [deleteTodo] = useMutation(DELETE_TODO, {
		onCompleted: () => {
			refetch();
		},
	});

	return (
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
	);
};

export default TodoItem;
