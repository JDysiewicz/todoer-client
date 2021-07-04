import React, { useContext } from "react";
import { Todo } from "../../types";
import { Checkbox } from "@chakra-ui/checkbox";
import { useMutation } from "@apollo/client";
import { DELETE_TODO } from "../../graphql/mutations";
import { RefetchProjectContext } from "../../context/RefetchProjectContext";
interface TodoItemProps {
	todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
	const refetch = useContext(RefetchProjectContext);

	const [deleteTodo] = useMutation(DELETE_TODO, {
		onCompleted: () => {
			refetch();
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
