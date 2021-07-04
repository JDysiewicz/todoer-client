import {
	FetchResult,
	MutationFunctionOptions,
	OperationVariables,
	useMutation,
} from "@apollo/client";
import { useHistory } from "react-router";
import { LOG_IN } from "../graphql/mutations";
import { User } from "../types";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface UseLoginUserInput {
	setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	setError: React.Dispatch<React.SetStateAction<string>>;
}

export const useLoginUser = ({
	setIsSubmitting,
	setUser,
	setError,
}: UseLoginUserInput): ((
	options?: MutationFunctionOptions<any, OperationVariables> | undefined
) => Promise<FetchResult<any, Record<string, any>, Record<string, any>>>) => {
	const history = useHistory();
	const [logUserIn] = useMutation(LOG_IN, {
		onError: (err) => {
			if (err.message) setError(err.message);
			if (!err.message) setError("Something went wrong.");
			setTimeout(() => setError(""), 3000);
			setIsSubmitting(false);
		},
		onCompleted: (data) => {
			const token = data.loginUser.token;
			const user = data.loginUser.user;
			localStorage.setItem("token", token);
			setUser(user);
			setError("");
			setIsSubmitting(false);
			history.push("/");
		},
	});

	return logUserIn;
};
