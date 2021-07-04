import { AlertIcon, Alert } from "@chakra-ui/react";
import React from "react";

interface ErrorMessageProps {
	message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
	return (
		<Alert status="error">
			<AlertIcon />
			{message}
		</Alert>
	);
};

export default ErrorMessage;
