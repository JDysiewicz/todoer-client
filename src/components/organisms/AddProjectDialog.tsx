import {
	ApolloQueryResult,
	OperationVariables,
	useMutation,
} from "@apollo/client";
import { Button, ButtonGroup } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Text } from "@chakra-ui/layout";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
} from "@chakra-ui/modal";
import React, { useState } from "react";
import { CREATE_PROJECT } from "../../graphql/mutations";

interface AddProjectDialogProps {
	isOpen: boolean;
	onClose: () => void;
	refetchProjects: (
		variables?: Partial<OperationVariables> | undefined
	) => Promise<ApolloQueryResult<any>>;
}

const AddProjectDialog: React.FC<AddProjectDialogProps> = ({
	isOpen,
	onClose,
	refetchProjects,
}) => {
	const [name, setName] = useState("");
	const [createProject] = useMutation(CREATE_PROJECT, {
		onCompleted: (data) => {
			refetchProjects();
		},
	});

	const submitProject = () => {
		const input = { name, order: 1, color: "#FF6622" };
		createProject({ variables: input });
		setName("");
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader
					bg="#FAFAFA"
					borderTopLeftRadius="15px"
					borderTopRightRadius="15px"
				>
					Add Project
				</ModalHeader>

				<ModalBody>
					<FormControl id="project">
						<FormLabel>Name:</FormLabel>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
						/>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<ButtonGroup>
						<Button onClick={onClose}>Close</Button>
						<Button
							bgColor="#DB4C3F"
							color="#FFFFFF"
							size="md"
							disabled={name === ""}
							onClick={submitProject}
							_hover={{ bg: "#DB4C3F" }}
						>
							Add Project
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default AddProjectDialog;
