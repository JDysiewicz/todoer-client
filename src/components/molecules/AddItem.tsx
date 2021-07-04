import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "../../graphql/mutations";
import { Input } from "@chakra-ui/input";
import { Stack } from "@chakra-ui/layout";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { RefetchTodosContext } from "../../context/RefetchTodosContext";

interface AddItemProps {
	projectId: string;
	closeAddItem: () => void;
}

const AddItem: React.FC<AddItemProps> = ({ projectId, closeAddItem }) => {
	const [title, setTitle] = useState<string>("");
	const [due, setDue] = useState<Date>();
	const refetchTodos = useContext(RefetchTodosContext);
	const [createTodo] = useMutation(CREATE_TODO, {
		onCompleted: (data) => {
			refetchTodos();
		},
	});

	const handleSubmit = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		if (!title || !title.trim()) return;
		createTodo({ variables: { projectId, title, due } });
		setTitle("");
		setDue(undefined);
	};

	return (
		<Stack marginTop="2rem">
			<Input
				value={title}
				id="title"
				name="title"
				onChange={(e) => setTitle(e.target.value)}
				placeholder="e.g. take out the trash"
			/>
			<ButtonGroup spacing="3" flexDirection="row" align="center">
				<Button
					bgColor="#DB4C3F"
					color="#FFFFFF"
					size="md"
					disabled={!title || !title.trim()}
					onClick={handleSubmit}
					_hover={{ bg: "#DB4C3F" }}
				>
					Add todo
				</Button>
				<Button
					marginLeft="2rem"
					size="md"
					onClick={closeAddItem}
					variant="link"
				>
					Cancel
				</Button>
			</ButtonGroup>
		</Stack>
	);
};

export default AddItem;
