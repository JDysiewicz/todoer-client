import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router";
import { LOG_IN } from "../graphql/mutations";

export const useLoginUser = ({
	setEmail,
	setPassword,
	setIsSubmitting,
	setUser,
	setError,
}: any) => {
	const history = useHistory();
	const [logUserIn] = useMutation(LOG_IN, {
		onError: (err) => {
			if (err.message) setError(err.message);
			if (!err.message) setError("Something went wrong.");
			setTimeout(() => setError(""), 3000);
			setEmail("");
			setPassword("");
			setIsSubmitting(false);
		},
		onCompleted: (data) => {
			const token = data.loginUser.token;
			const user = data.loginUser.user;
			localStorage.setItem("token", token);
			setUser(user);
			setError("");
			setEmail("");
			setPassword("");
			setIsSubmitting(false);
			history.push("/");
		},
	});

	return logUserIn;
};
