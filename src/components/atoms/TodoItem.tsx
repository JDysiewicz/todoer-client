import React, { useContext } from "react";
import { Todo } from "../../types";
import { Checkbox } from "@chakra-ui/checkbox";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../../graphql/mutations";
import { RefetchTodosContext } from "../../context/RefetchTodosContext";
interface TodoItemProps {
	todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
	const refetchTodos = useContext(RefetchTodosContext);

	const [deleteTodo] = useMutation(DELETE_TODO, {
		onCompleted: () => {
			refetchTodos();
		},
	});

	return (
		<Checkbox
			colorScheme="red"
			onChange={() =>
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
