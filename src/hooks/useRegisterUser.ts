import {
	FetchResult,
	MutationFunctionOptions,
	OperationVariables,
	useMutation,
} from "@apollo/client";
import { useHistory } from "react-router";
import { CREATE_USER } from "../graphql/mutations";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface UseRegisterUserInput {
	setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export const useRegisterUser = ({
	setIsSubmitting,
	setError,
}: UseRegisterUserInput): ((
	options?: MutationFunctionOptions<any, OperationVariables> | undefined
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
	const history = useHistory();
	const [registerUser] = useMutation(CREATE_USER, {
		onError: (err) => {
			if (err.message) setError(err.message);
			if (!err.message) setError("Something went wrong.");
			setTimeout(() => setError(""), 3000);
			setIsSubmitting(false);
		},
		onCompleted: (data) => {
			setIsSubmitting(false);
			history.push("/");
		},
	});

	return registerUser;
};
