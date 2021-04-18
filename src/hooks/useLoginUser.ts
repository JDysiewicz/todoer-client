import { gql, useMutation } from "@apollo/client";

const LOG_IN = gql`
	mutation LogIn($email: String!, $password: String!) {
		loginUser(input: { email: $email, password: $password }) {
			token
			user {
				email
				id
				name
				role
			}
		}
	}
`;

export const useLoginUser = ({
	setEmail,
	setPassword,
	setIsSubmitting,
	setUser,
	setError,
}: any) => {
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
		},
	});

	return logUserIn;
};
